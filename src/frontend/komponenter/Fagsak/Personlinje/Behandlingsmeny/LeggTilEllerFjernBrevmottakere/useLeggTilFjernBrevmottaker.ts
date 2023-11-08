import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { useSkjema, useFelt, ok, feil } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus, byggHenterRessurs, hentDataFraRessurs } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import { PersonType } from '../../../../../typer/person';
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

const preutfyltNavnFixed = (mottaker: Mottaker | '', land: string, navn: string) => {
    if (mottaker === Mottaker.DØDSBO) {
        return !land || land === 'NO' ? `${navn} v/dødsbo` : `Estate of ${navn}`;
    }
    return navn;
};

const useLeggTilFjernBrevmottaker = ({ skjema }: { skjema: ILeggTilFjernBrevmottakerSkjema }) => {
    const { settToast } = useApp();
    const { åpenBehandling: åpenBehandlingRessurs, settÅpenBehandling } = useBehandling();
    const { behandlingId } = useSakOgBehandlingParams();
    const { request } = useHttp();
    const [navnErPreutfylt, settNavnErPreutfylt] = useState(false);

    const åpenBehandling = hentDataFraRessurs(åpenBehandlingRessurs);
    const søker = åpenBehandling?.personer.find(person => person.type === PersonType.SØKER);

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
                settToast(ToastTyper.BREVMOTTAKER_FJERNET, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Mottaker fjernet',
                });
                settÅpenBehandling(response);
            }
        });
    };

    return {
        skjema,
        lagreMottaker,
        valideringErOk,
        fjernMottaker,
        navnErPreutfylt,
    };
};

export default useLeggTilFjernBrevmottaker;
