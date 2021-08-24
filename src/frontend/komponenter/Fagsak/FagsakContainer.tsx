import React, { useEffect } from 'react';

import { useHistory } from 'react-router';
import { Route, Switch, useParams } from 'react-router-dom';

import AlertStripe from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { BehandlingProvider } from '../../context/BehandlingContext';
import { DokumentutsendingProvider } from '../../context/DokumentutsendingContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { ToggleNavn } from '../../typer/toggles';
import { useAmplitude } from '../../utils/amplitude';
import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';
import BehandlingContainer from './BehandlingContainer';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import Høyremeny from './Høyremeny/Høyremeny';
import JournalpostListe from './journalposter/JournalpostListe';
import Personlinje from './Personlinje/Personlinje';
import Saksoversikt from './Saksoversikt/Saksoversikt';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useParams<{ fagsakId: string }>();
    const history = useHistory();
    const { toggles } = useApp();
    const { loggSidevisning } = useAmplitude();
    const erPåSaksoversikt = history.location.pathname.includes('saksoversikt');
    const erPåDokumentliste = history.location.pathname.includes('dokumentliste');
    const erPåDokumentutsending = history.location.pathname.includes('dokumentutsending');
    const visDokumentutsending = toggles[ToggleNavn.brukErDeltBosted];

    const skalHaVenstremeny =
        !erPåSaksoversikt && !erPåDokumentliste && visDokumentutsending && !erPåDokumentutsending;

    const { bruker, fagsak, hentFagsak } = useFagsakRessurser();

    useEffect(() => {
        if (fagsakId !== undefined) {
            if (fagsak.status !== RessursStatus.SUKSESS) {
                hentFagsak(fagsakId);
            } else if (
                fagsak.status === RessursStatus.SUKSESS &&
                fagsak.data.id !== parseInt(fagsakId, 10)
            ) {
                hentFagsak(fagsakId);
            }
        }
    }, [fagsakId]);

    useEffect(() => {
        if (erPåSaksoversikt) {
            loggSidevisning('saksoversikt');
        }

        if (visDokumentutsending && erPåDokumentutsending) {
            loggSidevisning('dokumentutsending');
        }
    }, []);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            switch (bruker.status) {
                case RessursStatus.SUKSESS:
                    return (
                        <BehandlingProvider>
                            <Personlinje bruker={bruker.data} fagsak={fagsak.data} />

                            <div className={'fagsakcontainer__content'}>
                                {skalHaVenstremeny && (
                                    <div className={'fagsakcontainer__content--venstremeny'}>
                                        <Venstremeny fagsak={fagsak.data} />
                                    </div>
                                )}
                                <div
                                    id={'fagsak-main'}
                                    className={'fagsakcontainer__content--main'}
                                >
                                    <Switch>
                                        <Route
                                            exact={true}
                                            path="/fagsak/:fagsakId/saksoversikt"
                                            render={() => {
                                                return <Saksoversikt fagsak={fagsak.data} />;
                                            }}
                                        />

                                        {visDokumentutsending && (
                                            <Route
                                                exact={true}
                                                path="/fagsak/:fagsakId/dokumentutsending"
                                                render={() => {
                                                    return (
                                                        <DokumentutsendingProvider>
                                                            <Dokumentutsending
                                                                fagsak={fagsak.data}
                                                            />
                                                        </DokumentutsendingProvider>
                                                    );
                                                }}
                                            />
                                        )}

                                        <Route
                                            exact={true}
                                            path="/fagsak/:fagsakId/dokumentliste"
                                            render={() => {
                                                return <JournalpostListe bruker={bruker.data} />;
                                            }}
                                        />

                                        <Route
                                            path="/fagsak/:fagsakId/:behandlingId"
                                            render={() => {
                                                return <BehandlingContainer fagsak={fagsak.data} />;
                                            }}
                                        />
                                    </Switch>
                                </div>
                                {!erPåSaksoversikt && (
                                    <div className={'fagsakcontainer__content--høyremeny'}>
                                        <Høyremeny fagsak={fagsak.data} />
                                    </div>
                                )}
                            </div>
                        </BehandlingProvider>
                    );
                case RessursStatus.FEILET:
                case RessursStatus.FUNKSJONELL_FEIL:
                case RessursStatus.IKKE_TILGANG:
                    return <AlertStripe children={bruker.frontendFeilmelding} type={'feil'} />;
                default:
                    return <div />;
            }
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={`Du har ikke tilgang til å se denne saken.`}
                    type={'advarsel'}
                />
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <AlertStripe children={fagsak.frontendFeilmelding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default FagsakContainer;
