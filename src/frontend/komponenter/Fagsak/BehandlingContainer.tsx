import React from 'react';
import { Route, Switch, useParams } from 'react-router';
import { SøknadProvider } from '../../context/SøknadContext';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IFagsak } from '../../typer/fagsak';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import TilkjentYtelse from './TilkjentYtelse/TilkjentYtelse';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Vilkårsvurdering from './Vilkårsvurdering/Vilkårsvurdering';
import { useBehandling } from '../../context/BehandlingContext';
import { RessursStatus } from '@navikt/familie-typer';
import SystemetLaster from '../Felleskomponenter/SystemetLaster/SystemetLaster';
import AlertStripe from 'nav-frontend-alertstriper';
import { TidslinjeProvider } from '../../context/TidslinjeContext';

interface IProps {
    fagsak: IFagsak;
}

const BehandlingContainer: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { behandlingId } = useParams<{ behandlingId: string }>();
    const { bestemÅpenBehandling, åpenBehandling } = useBehandling();

    React.useEffect(() => {
        bestemÅpenBehandling(behandlingId);
    }, [fagsak, behandlingId]);

    switch (åpenBehandling.status) {
        case RessursStatus.SUKSESS:
            return (
                <Switch>
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/registrer-soknad"
                        render={() => {
                            return (
                                <SøknadProvider>
                                    <RegistrerSøknad åpenBehandling={åpenBehandling.data} />
                                </SøknadProvider>
                            );
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/vilkaarsvurdering"
                        render={() => {
                            return (
                                <VilkårsvurderingProvider åpenBehandling={åpenBehandling.data}>
                                    <Vilkårsvurdering
                                        fagsak={fagsak}
                                        åpenBehandling={åpenBehandling.data}
                                    />
                                </VilkårsvurderingProvider>
                            );
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/tilkjent-ytelse"
                        render={() => {
                            return (
                                <TidslinjeProvider>
                                    <TilkjentYtelse
                                        fagsak={fagsak}
                                        åpenBehandling={åpenBehandling.data}
                                    />
                                </TidslinjeProvider>
                            );
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/vedtak"
                        render={() => {
                            return (
                                <OppsummeringVedtak
                                    fagsak={fagsak}
                                    åpenBehandling={åpenBehandling.data}
                                />
                            );
                        }}
                    />
                </Switch>
            );
        case RessursStatus.HENTER:
            return <SystemetLaster />;
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={`Du har ikke tilgang til å se denne behandlingen.`}
                    type={'advarsel'}
                />
            );
        case RessursStatus.FEILET:
            return <AlertStripe children={åpenBehandling.frontendFeilmelding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default BehandlingContainer;
