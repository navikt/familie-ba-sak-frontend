import { useHttp } from '@navikt/familie-http';
import { useSkjema, useFelt, ok, feil } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus, byggHenterRessurs } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import { AlertType, ToastTyper } from '../../../../Felleskomponenter/Toast/typer';

export enum Mottaker {
    BRUKER_MED_UTENLANDSK_ADRESSE = 'BRUKER_MED_UTENLANDSK_ADRESSE',
    FULLMEKTIG = 'FULLMEKTIG',
    VERGE = 'VERGE',
    DØDSBO = 'DØDSBO',
}

export const mottakerVisningsnavn: Record<Mottaker, string> = {
    BRUKER_MED_UTENLANDSK_ADRESSE: 'Bruker med utenlandsk adresse',
    FULLMEKTIG: 'Fullmektig',
    VERGE: 'Verge',
    DØDSBO: 'Dødsbo',
};

export interface ILeggTilFjernBrevmottakerSkjema {
    mottaker: Mottaker | '';
    navn: string;
    adresselinje1: string;
    adresselinje2: string;
    postnummer: string;
    poststed: string;
    land: string;
}

export interface IRestBrevmottaker {
    id: number;
    type: Mottaker;
    navn: string;
    adresselinje1: string;
    adresselinje2?: string;
    postnummer: string;
    poststed: string;
    landkode: string;
}

const useLeggTilFjernBrevmottaker = () => {
    const { settToast } = useApp();
    const { settÅpenBehandling } = useBehandling();
    const { behandlingId } = useSakOgBehandlingParams();
    const { request } = useHttp();

    const mottaker = useFelt<Mottaker | ''>({
        verdi: '',
        valideringsfunksjon: felt =>
            felt.verdi !== '' ? ok(felt) : feil(felt, 'Feltet er påkrevd'),
    });
    const navn = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Navn på person eller organisasjon er påkrevd');
            }
            return felt.verdi.length <= 80
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const adresselinje1 = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 80
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn');
        },
    });
    const adresselinje2 = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt =>
            felt.verdi.length <= 80
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 80 tegn'),
    });
    const postnummer = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 10
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 10 tegn');
        },
    });
    const poststed = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt => {
            if (felt.verdi === '') {
                return feil(felt, 'Feltet er påkrevd');
            }
            return felt.verdi.length <= 50
                ? ok(felt)
                : feil(felt, 'Feltet kan ikke inneholde mer enn 50 tegn');
        },
    });
    const land = useFelt<string>({
        verdi: '',
        valideringsfunksjon: felt =>
            felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Feltet er påkrevd. Velg Norge dersom brevet skal sendes innenlands.'),
    });

    const {
        skjema,
        kanSendeSkjema,
        settVisfeilmeldinger,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
        valideringErOk,
    } = useSkjema<ILeggTilFjernBrevmottakerSkjema, IBehandling>({
        felter: {
            mottaker,
            navn,
            adresselinje1,
            adresselinje2,
            postnummer,
            poststed,
            land,
        },
        skjemanavn: 'Legg til eller fjern brevmottaker',
    });

    const lagreMottaker = () => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggHenterRessurs());
            settVisfeilmeldinger(false);
            onSubmit(
                {
                    method: 'POST',
                    data: {
                        type: skjema.felter.mottaker.verdi,
                        navn: skjema.felter.navn.verdi,
                        adresselinje1: skjema.felter.adresselinje1.verdi,
                        adresselinje2:
                            skjema.felter.adresselinje2.verdi !== ''
                                ? skjema.felter.adresselinje2.verdi
                                : undefined,
                        postnummer: skjema.felter.postnummer.verdi,
                        poststed: skjema.felter.poststed.verdi,
                        landkode: skjema.felter.land.verdi,
                    },
                    url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillSkjema();
                        settToast(ToastTyper.BREVMOTTAKER_LAGRET, {
                            alertType: AlertType.SUCCESS,
                            tekst: 'Mottaker ble lagret',
                        });
                        settÅpenBehandling(response);
                    }
                }
            );
        } else {
            settVisfeilmeldinger(true);
        }
    };

    const fjernMottaker = (mottakerId: number) => {
        return request<void, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/brevmottaker/${behandlingId}/${mottakerId}`,
            påvirkerSystemLaster: false,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(response);
            }
        });
    };

    return {
        skjema,
        lagreMottaker,
        valideringErOk,
        fjernMottaker,
    };
};

export default useLeggTilFjernBrevmottaker;
