import React, { useEffect } from 'react';

import { Route, Switch, useHistory, useParams } from 'react-router';

import AlertStripe from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../context/BehandlingContext';
import { SimuleringProvider } from '../../context/SimuleringContext';
import { SøknadProvider } from '../../context/SøknadContext';
import { TidslinjeProvider } from '../../context/TidslinjeContext';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IFagsak } from '../../typer/fagsak';
import { useAmplitude } from '../../utils/amplitude';
import { SideId, sider } from '../Felleskomponenter/Venstremeny/sider';
import Filtreringsregler from './Filtreringsregler/Filtreringsregler';
import Simulering from './Simulering/Simulering';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import TilkjentYtelse from './TilkjentYtelse/TilkjentYtelse';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Vilkårsvurdering from './Vilkårsvurdering/Vilkårsvurdering';

interface IProps {
    fagsak: IFagsak;
}

const BehandlingContainer: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { loggSidevisning } = useAmplitude();
    const history = useHistory();
    const { behandlingId } = useParams<{ behandlingId: string }>();
    const { bestemÅpenBehandling, åpenBehandling, leggTilBesøktSide } = useBehandling();

    React.useEffect(() => {
        bestemÅpenBehandling(behandlingId);
    }, [fagsak, behandlingId]);

    const sidevisning = history.location.pathname.split('/')[4];
    useEffect(() => {
        if (sidevisning) {
            loggSidevisning(sidevisning);
            leggTilBesøktSide(
                Object.entries(sider).find(([_, side]) => side.href === sidevisning)?.[0] as SideId
            );
        }
    }, [sidevisning]);

    switch (åpenBehandling.status) {
        case RessursStatus.SUKSESS:
            return (
                <Switch>
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/registrer-soknad"
                        render={() => {
                            return (
                                <SøknadProvider åpenBehandling={åpenBehandling.data}>
                                    <RegistrerSøknad />
                                </SøknadProvider>
                            );
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/filtreringsregler"
                        render={() => {
                            return (
                                <Filtreringsregler
                                    fagsak={fagsak}
                                    åpenBehandling={åpenBehandling.data}
                                />
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
                        path="/fagsak/:fagsakId/:behandlingId/simulering"
                        render={() => {
                            return (
                                <SimuleringProvider åpenBehandling={åpenBehandling.data}>
                                    <Simulering
                                        fagsak={fagsak}
                                        åpenBehandling={åpenBehandling.data}
                                    />
                                </SimuleringProvider>
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
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={`Du har ikke tilgang til å se denne behandlingen.`}
                    type={'advarsel'}
                />
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <AlertStripe children={åpenBehandling.frontendFeilmelding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default BehandlingContainer;
