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

const [FagsakProvider, useFagsakRessurser] = createUseContext(() => {
    const [fagsak, settFagsak] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());
    const [logg, settLogg] = React.useState<Ressurs<ILogg[]>>(byggTomRessurs());
    const { axiosRequest } = useApp();

    React.useEffect(() => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            hentBruker(fagsak.data.søkerFødselsnummer);
        }
    }, [fagsak.status]);

    React.useEffect(() => {
        if (fagsak.status === RessursStatus.SUKSESS && erBrukerUtdatert(bruker, fagsak)) {
            hentBruker(fagsak.data.søkerFødselsnummer);
        }
    }, [fagsak]);

    const hentFagsak = (fagsakId: string): void => {
        settFagsak(byggHenterRessurs());
        axiosRequest<IFagsak, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetFagsak: Ressurs<IFagsak>) => {
                settFagsak(hentetFagsak);
            })
            .catch((_error: AxiosError) => {
                settFagsak(byggFeiletRessurs('Ukjent ved innhenting av fagsak'));
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
        settBruker(byggHenterRessurs());
        axiosRequest<IPersonInfo, void>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent: personIdent,
            },
            påvirkerSystemLaster: true,
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            settBruker(hentetPerson);
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

    return {
        bruker,
        fagsak,
        hentFagsak,
        hentLogg,
        logg,
        settFagsak,
    };
});

export { FagsakProvider, useFagsakRessurser };
