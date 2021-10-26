import React, { useEffect } from 'react';

import { Redirect, useHistory } from 'react-router';
import { Route, Switch, useParams } from 'react-router-dom';

import AlertStripe from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
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
    const erPåDokumentliste = history.location.pathname.includes('dokumenter');
    const erPåDokumentutsending = history.location.pathname.includes('dokumentutsending');
    const visDokumentutsending = toggles[ToggleNavn.brukErDeltBosted];

    const skalHaVenstremeny = visDokumentutsending
        ? !erPåSaksoversikt && !erPåDokumentliste && !erPåDokumentutsending
        : !erPåSaksoversikt && !erPåDokumentliste;

    const skalHaHøyremeny = visDokumentutsending
        ? !erPåSaksoversikt && !erPåDokumentutsending
        : !erPåSaksoversikt;

    const { bruker, minimalFagsak, hentMinimalFagsak } = useFagsakRessurser();

    useEffect(() => {
        if (fagsakId !== undefined) {
            if (minimalFagsak.status !== RessursStatus.SUKSESS) {
                hentMinimalFagsak(fagsakId);
            } else if (
                minimalFagsak.status === RessursStatus.SUKSESS &&
                minimalFagsak.data.id !== parseInt(fagsakId, 10)
            ) {
                hentMinimalFagsak(fagsakId);
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

    switch (minimalFagsak.status) {
        case RessursStatus.SUKSESS:
            switch (bruker.status) {
                case RessursStatus.SUKSESS:
                    return (
                        <>
                            <Personlinje bruker={bruker.data} minimalFagsak={minimalFagsak.data} />

                            <div className={'fagsakcontainer__content'}>
                                {skalHaVenstremeny && (
                                    <div className={'fagsakcontainer__content--venstremeny'}>
                                        <Venstremeny />
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
                                                return (
                                                    <Saksoversikt
                                                        minimalFagsak={minimalFagsak.data}
                                                    />
                                                );
                                            }}
                                        />

                                        {visDokumentutsending && (
                                            <Route
                                                exact={true}
                                                path="/fagsak/:fagsakId/dokumentutsending"
                                                render={() => {
                                                    return (
                                                        <DokumentutsendingProvider
                                                            fagsakId={minimalFagsak.data.id}
                                                        >
                                                            <Dokumentutsending />
                                                        </DokumentutsendingProvider>
                                                    );
                                                }}
                                            />
                                        )}

                                        <Route
                                            exact={true}
                                            path="/fagsak/:fagsakId/dokumenter"
                                            render={() => {
                                                return <JournalpostListe bruker={bruker.data} />;
                                            }}
                                        />

                                        <Route
                                            path="/fagsak/:fagsakId/:behandlingId"
                                            render={() => {
                                                return <BehandlingContainer fagsakId={fagsakId} />;
                                            }}
                                        />
                                        <Redirect
                                            from="/fagsak/:fagsakId"
                                            to="/fagsak/:fagsakId/saksoversikt"
                                        />
                                    </Switch>
                                </div>
                                {skalHaHøyremeny && (
                                    <div className={'fagsakcontainer__content--høyremeny'}>
                                        <Høyremeny />
                                    </div>
                                )}
                            </div>
                        </>
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
            return <AlertStripe children={minimalFagsak.frontendFeilmelding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default FagsakContainer;
