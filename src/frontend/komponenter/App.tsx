import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { BrukerProvider } from '../context/BrukerContext';
import { hentInnloggetBruker } from '../api/saksbehandler';
import { ISaksbehandler } from '../typer/saksbehandler';
import FagsakContainer from './Fagsak/FagsakContainer';
import OpprettFagsak from './Fagsak/OpprettFagsak/OpprettFagsak';
import { FagsakProvider } from './FagsakProvider';
import TempHeader from './TempHeader';
import ErrorBoundary from './Felleskomponenter/ErrorBoundary/ErrorBoundary';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';

Modal.setAppElement(document.getElementById('modal-a11y-wrapper'));

const App: React.FunctionComponent = () => {
    const [innloggetSaksbehandler, settInnloggetSaksbehandler] = React.useState<
        ISaksbehandler | undefined
    >(undefined);

    React.useEffect(() => {
        hentInnloggetBruker().then((innhentetInnloggetSaksbehandler: ISaksbehandler) => {
            settInnloggetSaksbehandler(innhentetInnloggetSaksbehandler);
        });
    }, []);

    return (
        <ErrorBoundary innloggetSaksbehandler={innloggetSaksbehandler}>
            <FagsakProvider>
                <BrukerProvider>
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
                                    render={() => {
                                        return <OpprettFagsak />;
                                    }}
                                />
                                <Route path="/fagsak/:fagsakId" component={FagsakContainer} />
                            </Switch>
                        </Router>
                    </div>
                </BrukerProvider>
            </FagsakProvider>
        </ErrorBoundary>
    );
};

export default App;
