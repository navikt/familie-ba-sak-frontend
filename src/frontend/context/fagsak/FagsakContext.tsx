import React, { useState } from 'react';

import type { AxiosError } from 'axios';
import createUseContext from 'constate';
import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useOppdaterBrukerOgKlagebehandlingerNårFagsakEndrerSeg } from './useOppdaterBrukerOgKlagebehandlingerNårFagsakEndrerSeg';
import type { SkjemaBrevmottaker } from '../../komponenter/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IBaseFagsak, IInternstatistikk, IMinimalFagsak } from '../../typer/fagsak';
import { mapMinimalFagsakTilBaseFagsak } from '../../typer/fagsak';
import type { IKlagebehandling } from '../../typer/klage';
import type { IPersonInfo } from '../../typer/person';
import { sjekkTilgangTilPerson } from '../../utils/commons';

const [FagsakProvider, useFagsakContext] = createUseContext(() => {
    const [minimalFagsak, settMinimalFagsak] = React.useState<Ressurs<IMinimalFagsak>>(
        byggTomRessurs()
    );

    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());
    const [fagsakerPåBruker, settFagsakerPåBruker] = React.useState<IBaseFagsak[]>();
    const [internstatistikk, settInternstatistikk] = React.useState<Ressurs<IInternstatistikk>>(
        byggTomRessurs()
    );
    const [manuelleInfoBrevmottakere, settManuelleInfoBrevmottakere] = useState<
        SkjemaBrevmottaker[]
    >([]);

    const [klagebehandlinger, settKlagebehandlinger] = useState<IKlagebehandling[]>([]);

    const { request } = useHttp();

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

    const oppdaterKlagebehandlingerPåFagsak = () => {
        const fagsakId = hentDataFraRessurs(minimalFagsak)?.id;

        if (fagsakId) {
            request<void, IKlagebehandling[]>({
                method: 'GET',
                url: `/familie-ba-sak/api/fagsaker/${fagsakId}/hent-klagebehandlinger`,
                påvirkerSystemLaster: true,
            }).then(klagebehandlingerRessurs =>
                settKlagebehandlinger(hentDataFraRessurs(klagebehandlingerRessurs) ?? [])
            );
        }
    };

    useOppdaterBrukerOgKlagebehandlingerNårFagsakEndrerSeg({
        minimalFagsak,
        settBruker,
        oppdaterBrukerHvisFagsakEndres,
        bruker,
        oppdaterKlagebehandlingerPåFagsak,
    });

    const oppdaterGjeldendeFagsak = () => {
        const fagsakId = hentDataFraRessurs(minimalFagsak)?.id;
        fagsakId && hentMinimalFagsak(fagsakId);
    };

    return {
        bruker,
        fagsakerPåBruker,
        hentInternstatistikk,
        hentMinimalFagsak,
        internstatistikk,
        minimalFagsak,
        settMinimalFagsak,
        hentFagsakerForPerson,
        klagebehandlinger,
        oppdaterKlagebehandlingerPåFagsak,
        oppdaterGjeldendeFagsak,
        manuelleInfoBrevmottakere,
        settManuelleInfoBrevmottakere,
    };
});

export { FagsakProvider, useFagsakContext };
