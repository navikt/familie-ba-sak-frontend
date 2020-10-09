import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FagsakProvider } from '../context/FagsakContext';
import { Oppgaver } from '../context/OppgaverContext';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';
import UIModalWrapper from './Felleskomponenter/Modal/UIModalWrapper';
import ManuellJournalføring from './ManuellJournalføring/ManuellJournalføring';
import classNames from 'classnames';
import SystemetLaster from './Felleskomponenter/SystemetLaster/SystemetLaster';
import FagsakContainer from './Fagsak/FagsakContainer';
import TilgangModal from './Felleskomponenter/TilgangModal/TilgangModal';

const Container: React.FC = () => {
    const {
        autentisert,
        systemetLaster,
        innloggetSaksbehandler,
        visTilgangModal,
        settVisTilgangModal,
        adressebeskyttelsegradering,
    } = useApp();

    return (
        <Router>
            <UIModalWrapper />
            <TilgangModal
                åpen={visTilgangModal}
                onRequestClose={() => settVisTilgangModal(false)}
                adressebeskyttelsegradering={adressebeskyttelsegradering}
            ></TilgangModal>
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
                                    component={ManuellJournalføring}
                                />
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
