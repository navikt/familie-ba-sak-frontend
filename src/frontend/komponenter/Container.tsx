import React from 'react';
import { FagsakProvider } from '../context/FagsakContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import OpprettFagsak from './Fagsak/OpprettFagsak/OpprettFagsak';
import FagsakContainer from './Fagsak/FagsakContainer';
import { useApp } from '../context/AppContext';
import UIModalWrapper from './Felleskomponenter/Modal/UIModalWrapper';
import TempHeader from './TempHeader';
import { ISaksbehandler } from '../typer/saksbehandler';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';

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
                    <TempHeader innloggetSaksbehandler={innloggetSaksbehandler} />
                    <div className={'container'} role="main">
                        <Router>
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
                </>
            ) : (
                <UgyldigSesjon />
            )}
        </FagsakProvider>
    );
};

export default Container;
