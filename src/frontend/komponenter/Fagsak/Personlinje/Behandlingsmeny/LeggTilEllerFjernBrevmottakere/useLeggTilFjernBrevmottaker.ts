import { useSkjema, useFelt } from '@navikt/familie-skjema';
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

const useLeggTilFjernBrevmottaker = (lukkModal: () => void) => {
    const { settToast } = useApp();
    const { settÅpenBehandling } = useBehandling();
    const { behandlingId } = useSakOgBehandlingParams();

    const mottaker = useFelt<Mottaker | ''>({
        verdi: '',
    });
    const navn = useFelt<string>({
        verdi: '',
    });
    const adresselinje1 = useFelt<string>({
        verdi: '',
    });
    const adresselinje2 = useFelt<string>({
        verdi: '',
    });
    const postnummer = useFelt<string>({
        verdi: '',
    });
    const poststed = useFelt<string>({
        verdi: '',
    });
    const land = useFelt<string>({
        verdi: '',
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
                        lukkModal();
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

    return {
        skjema,
        lagreMottaker,
        valideringErOk,
    };
};

export default useLeggTilFjernBrevmottaker;
