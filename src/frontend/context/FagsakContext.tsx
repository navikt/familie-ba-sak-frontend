import React from 'react';

import type { AxiosError } from 'axios';
import createUseContext from 'constate';
import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import type { IMinimalFagsak, IInternstatistikk, IBaseFagsak } from '../typer/fagsak';
import { mapMinimalFagsakTilBaseFagsak } from '../typer/fagsak';
import type { IPersonInfo } from '../typer/person';
import { sjekkTilgangTilPerson } from '../utils/commons';

const [FagsakProvider, useFagsakContext] = createUseContext(() => {
    const [minimalFagsak, settMinimalFagsak] = React.useState<Ressurs<IMinimalFagsak>>(
        byggTomRessurs()
    );

    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());
    const [fagsakerPåBruker, settFagsakerPåBruker] = React.useState<IBaseFagsak[]>();
    const [internstatistikk, settInternstatistikk] = React.useState<Ressurs<IInternstatistikk>>(
        byggTomRessurs()
    );
    const { request } = useHttp();

    React.useEffect(() => {
        if (
            minimalFagsak.status !== RessursStatus.SUKSESS &&
            minimalFagsak.status !== RessursStatus.HENTER
        ) {
            settBruker(byggTomRessurs());
        } else {
            oppdaterBrukerHvisFagsakEndres(
                bruker,
                hentDataFraRessurs(minimalFagsak)?.søkerFødselsnummer
            );
        }
    }, [minimalFagsak]);

    const hentMinimalFagsak = (fagsakId: string | number, påvirkerSystemLaster = true): void => {
        if (påvirkerSystemLaster) {
            settMinimalFagsak(byggHenterRessurs());
        }

        request<void, IMinimalFagsak>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/minimal/${fagsakId}`,
            påvirkerSystemLaster,
        })
            .then((hentetFagsak: Ressurs<IMinimalFagsak>) => {
                if (påvirkerSystemLaster || !deepEqual(hentetFagsak, minimalFagsak)) {
                    settMinimalFagsak(hentetFagsak);
                }
            })
            .catch((_error: AxiosError) => {
                settMinimalFagsak(byggFeiletRessurs('Ukjent ved innhenting av fagsak'));
            });
    };

    const oppdaterBrukerHvisFagsakEndres = (
        bruker: Ressurs<IPersonInfo>,
        søkerFødselsnummer?: string
    ): void => {
        if (søkerFødselsnummer === undefined) {
            return;
        }

        if (
            bruker.status !== RessursStatus.SUKSESS ||
            søkerFødselsnummer !== bruker.data.personIdent
        ) {
            hentBruker(søkerFødselsnummer);
        }
    };

    const hentBruker = (personIdent: string): void => {
        settBruker(byggHenterRessurs());
        request<void, IPersonInfo>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent,
            },
            påvirkerSystemLaster: true,
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            const brukerEtterTilgangssjekk = sjekkTilgangTilPerson(hentetPerson);
            settBruker(brukerEtterTilgangssjekk);
            if (brukerEtterTilgangssjekk.status === RessursStatus.SUKSESS) {
                hentFagsakerForPerson(personIdent).then((fagsaker: Ressurs<IMinimalFagsak[]>) => {
                    if (fagsaker.status === RessursStatus.SUKSESS) {
                        settFagsakerPåBruker(fagsaker.data.map(mapMinimalFagsakTilBaseFagsak));
                    }
                });
            }
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

    const hentFagsakerForPerson = async (personId: string) => {
        return request<{ personIdent: string }, IMinimalFagsak[]>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person`,
            data: {
                personIdent: personId,
            },
        }).then((fagsaker: Ressurs<IMinimalFagsak[]>) => {
            return fagsaker;
        });
    };

    return {
        bruker,
        fagsakerPåBruker,
        hentInternstatistikk,
        hentMinimalFagsak,
        internstatistikk,
        minimalFagsak,
        settMinimalFagsak,
        hentBruker,
        hentFagsakerForPerson,
    };
});

export { FagsakProvider, useFagsakContext };
