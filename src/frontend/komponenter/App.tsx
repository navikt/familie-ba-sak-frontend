import BoxedListWithLinks from '@navikt/boxed-list-with-links';
import Header from '@navikt/nap-header';
import { captureException, configureScope, showReportDialog, withScope } from '@sentry/browser';
import Modal from 'nav-frontend-modal';
import { Panel } from 'nav-frontend-paneler';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { slackNotify } from '../api/axios';
import { hentInnloggetBruker } from '../api/saksbehandler';
import { ISaksbehandler } from '../typer/saksbehandler';
import { slackKanaler } from '../typer/slack';
import FagsakContainer from './Fagsak/FagsakContainer';
import OpprettBehandling from './Fagsak/Opprett/OpprettBehandling';
import { OpprettBehandlingProvider } from './Fagsak/Opprett/OpprettBehandlingProvider';
import { FagsakProvider } from './FagsakProvider';

Modal.setAppElement(document.getElementById('modal-a11y-wrapper'));

interface IState {
    innloggetSaksbehandler?: ISaksbehandler;
}

class App extends React.Component<{}, IState> {
    public constructor(props: any) {
        super(props);

        this.state = {};
    }

    public componentDidMount() {
        hentInnloggetBruker().then(innhentetInnloggetSaksbehandler => {
            this.setState({ innloggetSaksbehandler: innhentetInnloggetSaksbehandler });
        });
    }

    public componentDidCatch(error: any, info: any) {
        if (process.env.NODE_ENV !== 'development') {
            configureScope(scope => {
                scope.setUser({
                    username: this.state.innloggetSaksbehandler
                        ? this.state.innloggetSaksbehandler.displayName
                        : 'Ukjent bruker',
                });
            });

            withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    captureException(error);
                });
            });

            slackNotify(
                `En feil har oppstått i vedtaksløsningen: \n*Error*: ${error}`,
                slackKanaler.alert
            );
            showReportDialog();
        }
    }

    public render() {
        return (
            <FagsakProvider>
                <Header
                    renderLinksPopoverContent={() => <div>IKKE IMPLEMENTERT</div>}
                    renderUserPopoverContent={() => (
                        <BoxedListWithLinks
                            items={[{ name: 'Logg ut', href: `${window.origin}/auth/logout` }]}
                        />
                    )}
                    title="Barnetrygd"
                    userName={
                        this.state.innloggetSaksbehandler?.displayName ?? 'Ukjent saksbehandler'
                    }
                    userUnit="Enhet"
                />
                <div className={'container'} role="main">
                    <Router>
                        <Panel border={true} className={'fagsakcontainer'}>
                            <Switch>
                                <Route
                                    exact={true}
                                    path={'/'}
                                    render={() => {
                                        return <Redirect from="/" to="/fagsak/opprett" />;
                                    }}
                                />
                                <Route
                                    exact={true}
                                    path="/fagsak/opprett"
                                    render={() => {
                                        return (
                                            <OpprettBehandlingProvider>
                                                <OpprettBehandling />
                                            </OpprettBehandlingProvider>
                                        );
                                    }}
                                />
                                <Route
                                    className={'fagsakcontainer'}
                                    path="/fagsak/:fagsakId"
                                    component={FagsakContainer}
                                />
                            </Switch>
                        </Panel>
                    </Router>
                </div>
            </FagsakProvider>
        );
    }
}

export default App;
