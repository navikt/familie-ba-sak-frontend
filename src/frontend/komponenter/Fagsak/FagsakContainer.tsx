import * as React from 'react';

import { Route, Switch, useParams } from 'react-router-dom';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';

import AlertStripe from 'nav-frontend-alertstriper';
import BehandleVilkår from './Vilkår/BehandleVilkår';
import { BehandlingVilkårProvider } from './Vilkår/BehandleVilkårProvider';
import Beregning from './Beregning/Beregning';
import { BeregningProvider } from './Beregning/BeregningProvider';
import Høyremeny from './Høyremeny/Høyremeny';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingProvider } from './OpprettBehandling/OpprettBehandlingProvider';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import { RessursStatus } from '../../typer/ressurs';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import Visittkort from '@navikt/familie-visittkort';
import { kjønnType } from '../../typer/person';

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
                <>
                    <Visittkort
                        navn={'IKKE IMPLEMENTERT'}
                        ident={fagsak.data.søkerFødselsnummer}
                        alder={18}
                        kjønn={kjønnType.K}
                    />
                    <div className={'fagsakcontainer__content'}>
                        <div className={'fagsakcontainer__content--venstremeny'} />
                        <div className={'fagsakcontainer__content--main'}>
                            <Switch>
                                <Route
                                    exact={true}
                                    path="/fagsak/:fagsakId"
                                    render={() => {
                                        return <Saksoversikt fagsak={fagsak.data} />;
                                    }}
                                />
                                <Route
                                    exact={true}
                                    path="/fagsak/:fagsakId/ny-behandling"
                                    render={() => {
                                        return (
                                            <OpprettBehandlingProvider fagsak={fagsak.data}>
                                                <OpprettBehandling fagsak={fagsak.data} />
                                            </OpprettBehandlingProvider>
                                        );
                                    }}
                                />
                                <Route
                                    exact={true}
                                    path="/fagsak/:fagsakId/vilkår"
                                    render={() => {
                                        return (
                                            <BehandlingVilkårProvider fagsak={fagsak.data}>
                                                <BehandleVilkår fagsak={fagsak.data} />
                                            </BehandlingVilkårProvider>
                                        );
                                    }}
                                />
                                <Route
                                    exact={true}
                                    path="/fagsak/:fagsakId/beregning"
                                    render={() => {
                                        return (
                                            <BeregningProvider fagsak={fagsak.data}>
                                                <Beregning fagsak={fagsak.data} />
                                            </BeregningProvider>
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
                        </div>
                        <div className={'fagsakcontainer__content--høyremeny'}>
                            <Høyremeny fagsak={fagsak.data} />
                        </div>
                    </div>
                </>
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
