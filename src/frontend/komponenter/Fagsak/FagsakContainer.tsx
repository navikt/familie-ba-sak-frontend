import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { BehandlingProvider } from '../../context/BehandlingContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { OpprettBehandlingProvider } from '../../context/OpprettBehandlingContext';
import { RessursStatus } from '@navikt/familie-typer';
import { formaterPersonIdent, hentAlder } from '../../utils/formatter';
import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';
import BehandlingContainer from './BehandlingContainer';
import Høyremeny from './Høyremeny/Høyremeny';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import Saksoversikt from './Saksoversikt/Saksoversikt';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useParams();

    const { bruker, fagsak, hentFagsak } = useFagsakRessurser();

    React.useEffect(() => {
        if (fagsakId !== undefined) {
            if (fagsak.status !== RessursStatus.SUKSESS) {
                hentFagsak(fagsakId);
            } else if (
                fagsak.status === RessursStatus.SUKSESS &&
                fagsak.data.id !== parseInt(fagsakId, 10)
            ) {
                hentFagsak(fagsakId);
            }
        }
    }, [fagsakId]);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            switch (bruker.status) {
                case RessursStatus.SUKSESS:
                    return (
                        <BehandlingProvider>
                            <Visittkort
                                navn={
                                    bruker.status === RessursStatus.SUKSESS
                                        ? bruker.data.navn
                                        : 'Ukjent'
                                }
                                ident={formaterPersonIdent(fagsak.data.søkerFødselsnummer)}
                                alder={
                                    bruker.status === RessursStatus.SUKSESS
                                        ? hentAlder(bruker.data.fødselsdato)
                                        : 0
                                }
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
                                <div
                                    id={'fagsak-main'}
                                    className={'fagsakcontainer__content--main'}
                                >
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
                                                    <OpprettBehandlingProvider
                                                        bruker={bruker.data}
                                                        fagsak={fagsak.data}
                                                    >
                                                        <OpprettBehandling fagsak={fagsak.data} />
                                                    </OpprettBehandlingProvider>
                                                );
                                            }}
                                        />
                                        <Route
                                            path="/fagsak/:fagsakId/:behandlingId"
                                            render={() => {
                                                return <BehandlingContainer fagsak={fagsak.data} />;
                                            }}
                                        />
                                    </Switch>
                                </div>
                                <div className={'fagsakcontainer__content--høyremeny'}>
                                    <Høyremeny fagsak={fagsak.data} />
                                </div>
                            </div>
                        </BehandlingProvider>
                    );
                case RessursStatus.FEILET:
                    return <AlertStripe children={bruker.frontendFeilmelding} type={'feil'} />;
                default:
                    return <div />;
            }
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={`Du har ikke tilgang til å se denne saken.`}
                    type={'advarsel'}
                />
            );
        case RessursStatus.FEILET:
            return <AlertStripe children={fagsak.frontendFeilmelding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default FagsakContainer;
