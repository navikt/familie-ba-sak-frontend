import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { hentPerson } from '../../api/person';
import { IPerson } from '../../typer/person';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';
import Beregning from './Beregning/Beregning';
import { BeregningProvider } from './Beregning/BeregningProvider';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingProvider } from './OpprettBehandling/OpprettBehandlingProvider';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import BehandleVilkår from './Vilkår/BehandleVilkår';
import { BehandlingVilkårProvider } from './Vilkår/BehandleVilkårProvider';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useParams();
    const [person, settPerson] = React.useState<Ressurs<IPerson>>({
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
                settPerson(hentetPerson)
            );
        }
    }, [fagsak.status]);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            return (
                <div className={'fagsakcontainer'}>
                    <Visittkort
                        navn={
                            person.status === RessursStatus.SUKSESS
                                ? person.data.navn
                                : 'IKKE IMPLEMENTERT'
                        }
                        ident={fagsak.data.søkerFødselsnummer}
                        alder={18}
                        kjønn={
                            person.status === RessursStatus.SUKSESS
                                ? person.data.kjønn
                                : kjønnType.UKJENT
                        }
                    />
                    <div className={'fagsakcontainer__content'}>
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
                </div>
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
