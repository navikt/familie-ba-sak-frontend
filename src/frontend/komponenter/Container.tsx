import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FagsakProvider } from '../context/FagsakContext';
import { OppgaverProvider } from '../context/OppgaverContext';
import { ISaksbehandler } from '../typer/saksbehandler';
import FagsakContainer from './Fagsak/FagsakContainer';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';
import UIModalWrapper from './Felleskomponenter/Modal/UIModalWrapper';
import ManuellJournalføring from './ManuellJournalføring/ManuellJournalføring';
import VisOppgaver from './Oppgaver/VisOppgaver';

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
                                <Route path="/fagsak/:fagsakId" component={FagsakContainer} />

                                <OppgaverProvider>
                                    <Route exact={true} path="/oppgaver" component={VisOppgaver} />
                                    <Route
                                        exact={true}
                                        path="/oppgaver/journalfør/:oppgaveId"
                                        component={ManuellJournalføring}
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
