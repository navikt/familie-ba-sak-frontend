import React from 'react';

import classNames from 'classnames';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { BehandlingProvider } from '../context/behandlingContext/BehandlingContext';
import { FagsakProvider } from '../context/FagsakContext';
import { Oppgaver } from '../context/OppgaverContext';
import { TidslinjeProvider } from '../context/TidslinjeContext';
import FagsakContainer from './Fagsak/FagsakContainer';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';
import UIModalWrapper from './Felleskomponenter/Modal/UIModalWrapper';
import SystemetLaster from './Felleskomponenter/SystemetLaster/SystemetLaster';
import TidslinjeVisualisering from './Felleskomponenter/TidslinjeVisualisering/TidslinjeVisualisering';
import Toasts from './Felleskomponenter/Toast/Toasts';
import { Infotrygd } from './Infotrygd/Infotrygd';
import Internstatistikk from './Internstatistikk';
import ManuellJournalfør from './ManuellJournalfør/ManuellJournalfør';

const Container: React.FC = () => {
    const { autentisert, systemetLaster, innloggetSaksbehandler } = useApp();

    return (
        <Router>
            <UIModalWrapper />
            {autentisert ? (
                <>
                    {systemetLaster() && <SystemetLaster />}
                    <Toasts />

                    <main className={classNames('container', systemetLaster() && 'blur')}>
                        <HeaderMedSøk
                            brukerNavn={innloggetSaksbehandler?.displayName}
                            brukerEnhet={innloggetSaksbehandler?.enhet}
                        />
                        <FagsakProvider>
                            <BehandlingProvider>
                                <Switch>
                                    <Route path="/fagsak/:fagsakId" component={FagsakContainer} />
                                    <Route
                                        exact={true}
                                        path="/oppgaver/journalfør/:oppgaveId"
                                        component={ManuellJournalfør}
                                    />
                                    <Route exact={true} path="/oppgaver" component={Oppgaver} />
                                    <Route path="/internstatistikk" component={Internstatistikk} />
                                    <Route path="/infotrygd" component={Infotrygd} />
                                    <Route
                                        exact={true}
                                        path="/tidslinjer/:behandlingId"
                                        render={() => (
                                            <TidslinjeProvider>
                                                <TidslinjeVisualisering />
                                            </TidslinjeProvider>
                                        )}
                                    />
                                    <Redirect to="/oppgaver" />
                                </Switch>
                            </BehandlingProvider>
                        </FagsakProvider>
                    </main>
                </>
            ) : (
                <UgyldigSesjon />
            )}
        </Router>
    );
};

export default Container;
