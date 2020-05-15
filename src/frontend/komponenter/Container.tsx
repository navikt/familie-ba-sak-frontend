import React from 'react';
import { FagsakProvider } from '../context/FagsakContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import FagsakContainer from './Fagsak/FagsakContainer';
import { useApp } from '../context/AppContext';
import UIModalWrapper from './Felleskomponenter/Modal/UIModalWrapper';
import { ISaksbehandler } from '../typer/saksbehandler';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';
import VisOppgaver from './Oppgaver/VisOppgaver';
import { OppgaverProvider } from '../context/OppgaverContext';
import ManuellJournalføring from './ManuellJournalføring/ManuellJournalføring';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const Container: React.FC<IProps> = ({ innloggetSaksbehandler }) => {
    const { autentisert } = useApp();

    return (
        <Router>
            <UIModalWrapper />
            {autentisert ? (
                <>
                    <div className={'container'} role="main">
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
                                <Route
                                    path="/fagsak/:fagsakId"
                                    render={() => (
                                        <FagsakContainer
                                            innloggetSaksbehandler={innloggetSaksbehandler}
                                        />
                                    )}
                                />

                                <OppgaverProvider>
                                    <Route
                                        exact={true}
                                        path="/oppgaver"
                                        render={() => {
                                            return (
                                                <VisOppgaver
                                                    innloggetSaksbehandler={innloggetSaksbehandler}
                                                />
                                            );
                                        }}
                                    />
                                    <Route
                                        exact={true}
                                        path="/oppgaver/journalfør/:oppgaveId"
                                        render={() => {
                                            return (
                                                <ManuellJournalføring
                                                    innloggetSaksbehandler={innloggetSaksbehandler}
                                                />
                                            );
                                        }}
                                    />
                                </OppgaverProvider>
                            </Switch>
                        </FagsakProvider>
                    </div>
                </>
            ) : (
                <UgyldigSesjon />
            )}
        </Router>
    );
};

export default Container;
