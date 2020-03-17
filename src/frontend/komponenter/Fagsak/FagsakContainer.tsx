import * as React from 'react';

import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { Route, Switch, useParams } from 'react-router-dom';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';

import AlertStripe from 'nav-frontend-alertstriper';
import BehandleVilkår from './Vilkår/BehandleVilkår';
import { BehandlingVilkårProvider } from './Vilkår/BehandleVilkårProvider';
import Beregning from './Beregning/Beregning';
import { BeregningProvider } from './Beregning/BeregningProvider';
import Høyremeny from './Høyremeny/Høyremeny';
import { IPerson } from '../../typer/person';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingProvider } from './OpprettBehandling/OpprettBehandlingProvider';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import Visittkort from '@navikt/familie-visittkort';
import { hentPerson } from '../../api/person';
import { kjønnType } from '@navikt/familie-typer';
import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useParams();
    const [bruker, settBruker] = React.useState<Ressurs<IPerson>>({
        status: RessursStatus.IKKE_HENTET,
    });

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

    React.useEffect(() => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            hentPerson(fagsak.data.søkerFødselsnummer).then((hentetPerson: Ressurs<IPerson>) =>
                settBruker(hentetPerson)
            );
        }
    }, [fagsak.status]);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            return (
                <>
                    <Visittkort
                        navn={
                            bruker.status === RessursStatus.SUKSESS
                                ? bruker.data.navn
                                : 'IKKE IMPLEMENTERT'
                        }
                        ident={fagsak.data.søkerFødselsnummer}
                        alder={18}
                        kjønn={
                            bruker.status === RessursStatus.SUKSESS
                                ? bruker.data.kjønn
                                : kjønnType.UKJENT
                        }
                    />
                    <div className={'fagsakcontainer__content'}>
                        <div className={'fagsakcontainer__content--venstremeny'}>
                            <Venstremeny fagsak={fagsak.data} />
                        </div>
                        <div className={'fagsakcontainer__content--main'}>
                            <Switch>
                                <Route
                                    exact={true}
                                    path="/fagsak/:fagsakId/saksoversikt"
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
                                    path="/fagsak/:fagsakId/vilkaarsvurdering"
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
