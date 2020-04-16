import * as React from 'react';

import { RessursStatus } from '../../typer/ressurs';
import { Route, Switch, useParams } from 'react-router-dom';

import AlertStripe from 'nav-frontend-alertstriper';
import BehandleVilkår from './Vilkårsvurdering/Vilkårsvurdering';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Beregning from './Beregning/Beregning';
import { BeregningProvider } from './Beregning/BeregningProvider';
import Høyremeny from './Høyremeny/Høyremeny';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import { OpprettBehandlingProvider } from './OpprettBehandling/OpprettBehandlingProvider';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import Visittkort from '@navikt/familie-visittkort';
import { kjønnType } from '@navikt/familie-typer';
import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import { SøknadProvider } from '../../context/SøknadContext';
import { hentAlder } from '../../utils/formatter';
import { useFagsakRessurser } from '../../context/FagsakContext';
import SystemetLaster from '../Felleskomponenter/SystemetLaster/SystemetLaster';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useParams();

    const { bruker, fagsak, hentFagsak } = useFagsakRessurser();

    React.useEffect(() => {
        if (
            fagsak.status !== RessursStatus.SUKSESS ||
            (fagsakId !== undefined && fagsak.data.id !== parseInt(fagsakId, 10))
        ) {
            hentFagsak(fagsakId!!);
        }
    }, [fagsakId]);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            switch (bruker.status) {
                case RessursStatus.SUKSESS:
                    return (
                        <>
                            <Visittkort
                                navn={
                                    bruker.status === RessursStatus.SUKSESS
                                        ? bruker.data.navn
                                        : 'Ukjent'
                                }
                                ident={fagsak.data.søkerFødselsnummer}
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
                                            path="/fagsak/:fagsakId/registrer-soknad"
                                            render={() => {
                                                return (
                                                    <SøknadProvider>
                                                        <RegistrerSøknad />
                                                    </SøknadProvider>
                                                );
                                            }}
                                        />
                                        <Route
                                            exact={true}
                                            path="/fagsak/:fagsakId/vilkaarsvurdering"
                                            render={() => {
                                                return (
                                                    <VilkårsvurderingProvider fagsak={fagsak.data}>
                                                        <BehandleVilkår fagsak={fagsak.data} />
                                                    </VilkårsvurderingProvider>
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
                    return <SystemetLaster />;
                default:
                    return <div />;
            }

        case RessursStatus.HENTER:
            return <SystemetLaster />;
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
