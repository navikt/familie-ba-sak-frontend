import React from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { IFagsak, IInternstatistikk } from '../typer/fagsak';
import { ILogg } from '../typer/logg';
import { IPersonInfo } from '../typer/person';
import { sjekkTilgangTilPerson } from '../utils/commons';

const [FagsakProvider, useFagsakRessurser] = createUseContext(() => {
    const [fagsak, settFagsak] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());
    const [logg, settLogg] = React.useState<Ressurs<ILogg[]>>(byggTomRessurs());
    const [internstatistikk, settInternstatistikk] = React.useState<Ressurs<IInternstatistikk>>(
        byggTomRessurs()
    );
    const { request } = useHttp();

    React.useEffect(() => {
        if (fagsak.status !== RessursStatus.SUKSESS && fagsak.status !== RessursStatus.HENTER) {
            settBruker(byggTomRessurs());
        } else {
            oppdaterBrukerHvisFagsakEndres(bruker, fagsak);
        }
    }, [fagsak]);

    const hentFagsak = (fagsakId: string): void => {
        settFagsak(byggHenterRessurs());
        request<void, IFagsak>({
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

    const oppdaterBrukerHvisFagsakEndres = (
        bruker: Ressurs<IPersonInfo>,
        fagsak: Ressurs<IFagsak>
    ): void => {
        if (fagsak.status !== RessursStatus.SUKSESS) {
            return;
        }

        if (
            bruker.status !== RessursStatus.SUKSESS ||
            fagsak.data.søkerFødselsnummer !== bruker.data.personIdent
        ) {
            hentBruker(fagsak.data.søkerFødselsnummer);
        }
    };

    const hentBruker = (personIdent: string): void => {
        settBruker(byggHenterRessurs());
        request<void, IPersonInfo>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent: personIdent,
            },
            påvirkerSystemLaster: true,
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            settBruker(sjekkTilgangTilPerson(hentetPerson));
        });
    };

    const oppdaterRegisteropplysninger = (behandlingId: number): void => {
        settFagsak(byggHenterRessurs());
        request<void, IFagsak>({
            method: 'GET',
            url: `/familie-ba-sak/api/person/oppdater-registeropplysninger/${behandlingId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetFagsak: Ressurs<IFagsak>) => {
                settFagsak(hentetFagsak);
            })
            .catch((_error: AxiosError) => {
                settFagsak(byggFeiletRessurs('Ukjent ved oppdatering av registeropplysninger'));
            });
    };

    const hentLogg = (behandlingId: number): void => {
        settLogg(byggHenterRessurs());
        request<void, ILogg[]>({
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

    const hentInternstatistikk = (): void => {
        settInternstatistikk(byggHenterRessurs());
        request<void, IInternstatistikk>({
            method: 'GET',
            url: `/familie-ba-sak/api/internstatistikk`,
        })
            .then((hentetInternstatistikk: Ressurs<IInternstatistikk>) => {
                settInternstatistikk(hentetInternstatistikk);
            })
            .catch(() => {
                settInternstatistikk(byggFeiletRessurs('Feil ved lasting av internstatistikk'));
            });
    };

    return {
        oppdaterRegisteropplysninger,
        hentInternstatistikk,
        internstatistikk,
        bruker,
        fagsak,
        hentFagsak,
        hentLogg,
        logg,
        settFagsak,
    };
});

export { FagsakProvider, useFagsakRessurser };
