import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from 'react';

import type { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useFagsakApi } from '../../api/useFagsakApi';
import { useApp } from '../../context/AppContext';
import type { IBaseFagsak, IMinimalFagsak } from '../../typer/fagsak';
import { mapMinimalFagsakTilBaseFagsak } from '../../typer/fagsak';
import type { IKlagebehandling } from '../../typer/klage';
import { type IPersonInfo } from '../../typer/person';
import { sjekkTilgangTilPerson } from '../../utils/commons';
import { obfuskerFagsak, obfuskerPersonInfo } from '../../utils/obfuskerData';
import type { SkjemaBrevmottaker } from './Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

interface IFagsakContext {
    bruker: Ressurs<IPersonInfo>;
    fagsakerPåBruker: IBaseFagsak[] | undefined;
    hentMinimalFagsak: (fagsakId: string | number, påvirkerSystemLaster?: boolean) => void;
    minimalFagsakRessurs: Ressurs<IMinimalFagsak>;
    settMinimalFagsakRessurs: (fagsak: Ressurs<IMinimalFagsak>) => void;
    minimalFagsak: IMinimalFagsak | undefined;
    klagebehandlinger: IKlagebehandling[];
    oppdaterKlagebehandlingerPåFagsak: () => void;
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
    settManuelleBrevmottakerePåFagsak: (brevmottakere: SkjemaBrevmottaker[]) => void;
}

const FagsakContext = createContext<IFagsakContext | undefined>(undefined);

export const FagsakProvider = (props: PropsWithChildren) => {
    const [minimalFagsakRessurs, settMinimalFagsakRessurs] =
        React.useState<Ressurs<IMinimalFagsak>>(byggTomRessurs());

    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());
    const [fagsakerPåBruker, settFagsakerPåBruker] = React.useState<IBaseFagsak[]>();
    const [manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak] = useState<
        SkjemaBrevmottaker[]
    >([]);

    const [klagebehandlinger, settKlagebehandlinger] = useState<IKlagebehandling[]>([]);

    const { request } = useHttp();
    const { skalObfuskereData } = useApp();
    const { hentFagsakerForPerson } = useFagsakApi();

    const hentMinimalFagsak = (fagsakId: string | number, påvirkerSystemLaster = true): void => {
        if (påvirkerSystemLaster) {
            settMinimalFagsakRessurs(byggHenterRessurs());
        }

        request<void, IMinimalFagsak>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/minimal/${fagsakId}`,
            påvirkerSystemLaster,
        })
            .then((hentetFagsak: Ressurs<IMinimalFagsak>) => {
                if (skalObfuskereData) {
                    obfuskerFagsak(hentetFagsak);
                }
                settMinimalFagsakRessurs(hentetFagsak);
            })
            .catch((_error: AxiosError) => {
                settMinimalFagsakRessurs(byggFeiletRessurs('Ukjent ved innhenting av fagsak'));
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
        request<{ ident: string }, IPersonInfo>({
            method: 'POST',
            url: '/familie-ba-sak/api/person',
            data: {
                ident: personIdent,
            },
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            const brukerEtterTilgangssjekk = sjekkTilgangTilPerson(hentetPerson);
            if (skalObfuskereData) {
                obfuskerPersonInfo(brukerEtterTilgangssjekk);
            }
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

    const oppdaterKlagebehandlingerPåFagsak = () => {
        const fagsakId = hentDataFraRessurs(minimalFagsakRessurs)?.id;

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

    useEffect(() => {
        if (
            minimalFagsakRessurs.status !== RessursStatus.SUKSESS &&
            minimalFagsakRessurs.status !== RessursStatus.HENTER
        ) {
            settBruker(byggTomRessurs());
        } else {
            oppdaterBrukerHvisFagsakEndres(
                bruker,
                hentDataFraRessurs(minimalFagsakRessurs)?.søkerFødselsnummer
            );
        }
        oppdaterKlagebehandlingerPåFagsak();
        settManuelleBrevmottakerePåFagsak([]);
    }, [minimalFagsakRessurs]);

    return (
        <FagsakContext.Provider
            value={{
                bruker,
                fagsakerPåBruker,
                hentMinimalFagsak,
                minimalFagsakRessurs,
                settMinimalFagsakRessurs,
                minimalFagsak: hentDataFraRessurs(minimalFagsakRessurs),
                klagebehandlinger,
                oppdaterKlagebehandlingerPåFagsak,
                manuelleBrevmottakerePåFagsak,
                settManuelleBrevmottakerePåFagsak,
            }}
        >
            {props.children}
        </FagsakContext.Provider>
    );
};

export const useFagsakContext = () => {
    const context = useContext(FagsakContext);

    if (context === undefined) {
        throw new Error('useFagsakContext må brukes innenfor en FagsakProvider');
    }

    return context;
};
