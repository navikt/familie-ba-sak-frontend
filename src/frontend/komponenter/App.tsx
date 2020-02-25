import { captureException, configureScope, showReportDialog, withScope } from '@sentry/browser';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { slackNotify, axiosRequest } from '../api/axios';
import { hentBrukerEnhet, hentInnloggetBruker } from '../api/saksbehandler';
import { ISaksbehandler } from '../typer/saksbehandler';
import { slackKanaler } from '../typer/slack';
import FagsakContainer from './Fagsak/FagsakContainer';
import OpprettBehandling from './Fagsak/Opprett/OpprettBehandling';
import { OpprettBehandlingProvider } from './Fagsak/Opprett/OpprettBehandlingProvider';
import { FagsakProvider } from './FagsakProvider';
import TempHeader from './TempHeader';

Modal.setAppElement(document.getElementById('modal-a11y-wrapper'));

interface IState {
    innloggetSaksbehandler?: ISaksbehandler;
    enhet: string;
}

class App extends React.Component<{}, IState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            enhet: `ukjent enhet`,
        };
    }

    public componentDidMount() {
        hentInnloggetBruker().then(innhentetInnloggetSaksbehandler => {
            this.setState({ innloggetSaksbehandler: innhentetInnloggetSaksbehandler });
        });

        hentBrukerEnhet().then(enhet => {
            this.setState({
                enhet: enhet,
            });
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
                <TempHeader
                    innloggetSaksbehandler={this.state.innloggetSaksbehandler}
                    enhet={this.state.enhet}
                />
                <div className={'container'} role="main">
                    <Router>
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
                            <Route path="/fagsak/:fagsakId" component={FagsakContainer} />
                        </Switch>
                    </Router>
                </div>
            </FagsakProvider>
        );
    }
}

export default App;
