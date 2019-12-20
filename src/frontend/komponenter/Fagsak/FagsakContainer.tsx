import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { RessursStatus } from '../../typer/ressurs';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';
import FastsettVedtak from './Behandle/FastsettVedtak';
import { FastsettVedtakProvider } from './Behandle/FastsettVedtakProvider';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useParams();

    const fagsakDispatcher = useFagsakDispatch();
    const fagsak = useFagsakContext().fagsak;

    React.useEffect(() => {
        if (
            fagsak.status !== RessursStatus.SUKSESS ||
            (fagsakId && fagsak.data.id !== parseInt(fagsakId, 10))
        ) {
            fagsakDispatcher({
                payload: fagsakId,
                type: actions.SETT_FAGSAK_ID,
            });
        }
    }, [fagsakId]);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            return (
                <Switch>
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/behandle"
                        render={() => {
                            return (
                                <FastsettVedtakProvider fagsak={fagsak.data}>
                                    <FastsettVedtak fagsak={fagsak.data} />
                                </FastsettVedtakProvider>
                            );
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/vedtak"
                        render={() => {
                            return <OppsummeringVedtak fagsak={fagsak.data} />;
                        }}
                    />
                </Switch>
            );

        case RessursStatus.HENTER:
            return <div />;
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={`Du har ikke tilgang til å se denne saken.`}
                    type={'advarsel'}
                />
            );
        case RessursStatus.FEILET:
            return <AlertStripe children={fagsak.melding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default FagsakContainer;
