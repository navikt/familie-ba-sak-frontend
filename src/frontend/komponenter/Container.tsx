import React from 'react';

import classNames from 'classnames';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { FagsakProvider } from '../context/FagsakContext';
import { Oppgaver } from '../context/OppgaverContext';
import FagsakContainer from './Fagsak/FagsakContainer';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';
import UIModalWrapper from './Felleskomponenter/Modal/UIModalWrapper';
import SystemetLaster from './Felleskomponenter/SystemetLaster/SystemetLaster';
import Internstatistikk from './Internstatistikk';
import ManuellJournalfør from './ManuellJournalfør/ManuellJournalfør';
import Migrering from './Migrering/Migrering';

const Container: React.FC = () => {
    const { autentisert, systemetLaster, innloggetSaksbehandler } = useApp();

    return (
        <Router>
            <UIModalWrapper />
            {autentisert ? (
                <>
                    {systemetLaster() && <SystemetLaster />}
                    <main className={classNames('container', systemetLaster() && 'blur')}>
                        <HeaderMedSøk
                            brukerNavn={innloggetSaksbehandler?.displayName}
                            brukerEnhet={innloggetSaksbehandler?.enhet}
                        />
                        <FagsakProvider>
                            <Switch>
                                <Route
                                    exact={true}
                                    path={'/'}
                                    render={() => {
                                        return <Redirect from={'/'} to={'/oppgaver'} />;
                                    }}
                                />
                                <Route path="/fagsak/:fagsakId" component={FagsakContainer} />
                                <Route exact={true} path="/oppgaver" component={Oppgaver} />
                                <Route
                                    exact={true}
                                    path="/oppgaver/journalfør/:oppgaveId"
                                    component={ManuellJournalfør}
                                />
                                <Route path="/internstatistikk" component={Internstatistikk} />
                                <Route path="/migrering" component={Migrering} />
                            </Switch>
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
