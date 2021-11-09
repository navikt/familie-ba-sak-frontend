import React, { useEffect } from 'react';

import { Redirect, Route, Switch, useHistory } from 'react-router';

import AlertStripe from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../context/behandlingContext/BehandlingContext';
import { SimuleringProvider } from '../../context/SimuleringContext';
import { SøknadProvider } from '../../context/SøknadContext';
import { TidslinjeProvider } from '../../context/TidslinjeContext';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { useAmplitude } from '../../utils/amplitude';
import { hentSideHref } from '../../utils/miljø';
import { SideId, sider } from '../Felleskomponenter/Venstremeny/sider';
import Filtreringsregler from './Filtreringsregler/Filtreringsregler';
import Simulering from './Simulering/Simulering';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import TilkjentYtelse from './TilkjentYtelse/TilkjentYtelse';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Vilkårsvurdering from './Vilkårsvurdering/Vilkårsvurdering';

const BehandlingContainer: React.FunctionComponent = () => {
    const { loggSidevisning } = useAmplitude();
    const history = useHistory();
    const { åpenBehandling, leggTilBesøktSide } = useBehandling();

    const sidevisning = hentSideHref(history.location.pathname);
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
                            return <Filtreringsregler åpenBehandling={åpenBehandling.data} />;
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/vilkaarsvurdering"
                        render={() => {
                            return (
                                <VilkårsvurderingProvider åpenBehandling={åpenBehandling.data}>
                                    <Vilkårsvurdering åpenBehandling={åpenBehandling.data} />
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
                                    <TilkjentYtelse åpenBehandling={åpenBehandling.data} />
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
                                    <Simulering åpenBehandling={åpenBehandling.data} />
                                </SimuleringProvider>
                            );
                        }}
                    />
                    <Route
                        exact={true}
                        path="/fagsak/:fagsakId/:behandlingId/vedtak"
                        render={() => {
                            return <OppsummeringVedtak åpenBehandling={åpenBehandling.data} />;
                        }}
                    />
                    <Redirect
                        from="/fagsak/:fagsakId/:behandlingId/"
                        to="/fagsak/:fagsakId/:behandlingId"
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
