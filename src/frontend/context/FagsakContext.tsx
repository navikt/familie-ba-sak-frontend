import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';
import { IFagsak } from '../typer/fagsak';
import { ILogg } from '../typer/logg';
import { IPersonInfo } from '../typer/person';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { useApp } from './AppContext';

interface IHovedRessurser {
    bruker: Ressurs<IPersonInfo>;
    fagsak: Ressurs<IFagsak>;
}

const initialState: IHovedRessurser = {
    bruker: {
        status: RessursStatus.IKKE_HENTET,
    },
    fagsak: {
        status: RessursStatus.IKKE_HENTET,
    },
};

const [FagsakProvider, useFagsakRessurser] = createUseContext(() => {
    const [fagsakRessurser, settFagsakRessurser] = React.useState<IHovedRessurser>(initialState);
    const [logg, settLogg] = React.useState<Ressurs<ILogg[]>>(byggTomRessurs());
    const { axiosRequest } = useApp();

    React.useEffect(() => {
        if (fagsakRessurser.fagsak.status === RessursStatus.SUKSESS) {
            hentBruker(fagsakRessurser.fagsak.data.søkerFødselsnummer);
        }
    }, [fagsakRessurser.fagsak.status]);

    React.useEffect(() => {
        if (
            fagsakRessurser.fagsak.status === RessursStatus.SUKSESS &&
            erBrukerUtdatert(fagsakRessurser.bruker, fagsakRessurser.fagsak)
        ) {
            hentBruker(fagsakRessurser.fagsak.data.søkerFødselsnummer);
        }
    }, [fagsakRessurser.fagsak]);

    const hentFagsak = (fagsakId: string): void => {
        settFagsakRessurser({
            ...fagsakRessurser,
            fagsak: {
                status: RessursStatus.HENTER,
            },
        });
        axiosRequest<IFagsak, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetFagsak: Ressurs<IFagsak>) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: hentetFagsak,
                });
            })
            .catch((_error: AxiosError) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: byggFeiletRessurs('Ukjent ved innhenting av fagsak'),
                });
            });
    };

    const erBrukerUtdatert = (bruker: Ressurs<IPersonInfo>, fagsak: Ressurs<IFagsak>): boolean => {
        if (fagsak.status !== RessursStatus.SUKSESS) {
            return false;
        }

        return (
            bruker.status === RessursStatus.IKKE_HENTET ||
            (bruker.status === RessursStatus.SUKSESS &&
                fagsak.data.søkerFødselsnummer !== bruker.data.personIdent)
        );
    };

    const hentBruker = (personIdent: string): void => {
        settFagsakRessurser({
            ...fagsakRessurser,
            bruker: {
                status: RessursStatus.HENTER,
            },
        });
        axiosRequest<IPersonInfo, void>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent: personIdent,
            },
            påvirkerSystemLaster: true,
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            settFagsakRessurser({
                ...fagsakRessurser,
                bruker: hentetPerson,
            });
        });
    };

    const hentLogg = (behandlingId: number): void => {
        settLogg(byggHenterRessurs());
        axiosRequest<ILogg[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/logg/${behandlingId}`,
        })
            .then((hentetLogg: Ressurs<ILogg[]>) => {
                settLogg(hentetLogg);
            })
            .catch(() => {
                settLogg(byggFeiletRessurs('Feil ved lasting av logg'));
            });
    };

    const settFagsak = (modifisertFagsak: Ressurs<IFagsak>): void =>
        settFagsakRessurser({ ...fagsakRessurser, fagsak: modifisertFagsak });

    return {
        bruker: fagsakRessurser.bruker,
        fagsak: fagsakRessurser.fagsak,
        hentFagsak,
        hentLogg,
        logg,
        ressurser: fagsakRessurser,
        settFagsak,
    };
});

export { FagsakProvider, useFagsakRessurser };
