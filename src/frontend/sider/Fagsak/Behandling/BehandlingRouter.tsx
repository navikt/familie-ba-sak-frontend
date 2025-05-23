import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router';

import { useBehandlingContext } from './context/BehandlingContext';
import Behandlingsresultat from './Sider/Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import RegistrerSøknad from './Sider/RegistrerSøknad/RegistrerSøknad';
import { SøknadProvider } from './Sider/RegistrerSøknad/SøknadContext';
import { sider } from './Sider/sider';
import type { SideId } from './Sider/sider';
import Simulering from './Sider/Simulering/Simulering';
import { SimuleringProvider } from './Sider/Simulering/SimuleringContext';
import { SammensattKontrollsakProvider } from './Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext';
import Vedtak from './Sider/Vedtak/Vedtak';
import { VedtakProvider } from './Sider/Vedtak/VedtakContext';
import Vilkårsvurdering from './Sider/Vilkårsvurdering/Vilkårsvurdering';
import { VilkårsvurderingProvider } from './Sider/Vilkårsvurdering/VilkårsvurderingContext';
import { useTrackTidsbrukPåSide } from '../../../hooks/useTrackTidsbrukPåSide';
import { TidslinjeProvider } from '../../../komponenter/Tidslinje/TidslinjeContext';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { hentSideHref } from '../../../utils/miljø';

interface Props {
    bruker: IPersonInfo;
    fagsak: IMinimalFagsak;
}

const BehandlingRouter: React.FC<Props> = ({ bruker, fagsak }) => {
    const location = useLocation();
    const { behandling, leggTilBesøktSide } = useBehandlingContext();
    useTrackTidsbrukPåSide(fagsak, behandling);

    const sidevisning = hentSideHref(location.pathname);
    useEffect(() => {
        if (sidevisning) {
            leggTilBesøktSide(
                Object.entries(sider).find(([_, side]) => side.href === sidevisning)?.[0] as SideId
            );
        }
    }, [sidevisning]);

    return (
        <Routes>
            <Route
                path="/registrer-institusjon"
                element={<RegistrerInstitusjon åpenBehandling={behandling} />}
            />
            <Route
                path="/registrer-soknad"
                element={
                    <SøknadProvider åpenBehandling={behandling}>
                        <RegistrerSøknad />
                    </SøknadProvider>
                }
            />
            <Route
                path="/filtreringsregler"
                element={<Filtreringsregler åpenBehandling={behandling} />}
            />
            <Route
                path="/vilkaarsvurdering"
                element={
                    <VilkårsvurderingProvider åpenBehandling={behandling}>
                        <Vilkårsvurdering åpenBehandling={behandling} />
                    </VilkårsvurderingProvider>
                }
            />
            <Route
                path="/tilkjent-ytelse"
                element={
                    <TidslinjeProvider>
                        <Behandlingsresultat åpenBehandling={behandling} />
                    </TidslinjeProvider>
                }
            />
            <Route
                path="/simulering"
                element={
                    <SimuleringProvider åpenBehandling={behandling}>
                        <Simulering åpenBehandling={behandling} />
                    </SimuleringProvider>
                }
            />
            <Route
                path="/vedtak"
                element={
                    <SimuleringProvider åpenBehandling={behandling}>
                        <VedtakProvider åpenBehandling={behandling}>
                            <SammensattKontrollsakProvider åpenBehandling={behandling}>
                                <Vedtak åpenBehandling={behandling} bruker={bruker} />
                            </SammensattKontrollsakProvider>
                        </VedtakProvider>
                    </SimuleringProvider>
                }
            />
        </Routes>
    );
};

export default BehandlingRouter;
