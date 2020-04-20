import React from 'react';
import { FagsakProvider } from '../context/FagsakContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import OpprettFagsak from './Fagsak/OpprettFagsak/OpprettFagsak';
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
        <FagsakProvider>
            <UIModalWrapper />
            {autentisert ? (
                <>
                    <div className={'container'} role="main">
                        <Router>
                            <HeaderMedSøk
                                brukerNavn={innloggetSaksbehandler?.displayName}
                                brukerEnhet={innloggetSaksbehandler?.enhet}
                            />
                            <Switch>
                                <Route
                                    exact={true}
                                    path={'/'}
                                    render={() => {
                                        return <Redirect from="/" to="/fagsak/ny-fagsak" />;
                                    }}
                                />
                                <Route
                                    exact={true}
                                    path="/fagsak/ny-fagsak"
                                    component={OpprettFagsak}
                                />
                                <Route path="/fagsak/:fagsakId" component={FagsakContainer} />

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
                        </Router>
                    </div>
                </>
            ) : (
                <UgyldigSesjon />
            )}
        </FagsakProvider>
    );
};

export default Container;
