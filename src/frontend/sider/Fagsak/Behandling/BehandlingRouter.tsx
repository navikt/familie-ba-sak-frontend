import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router';

import { useBrukerContext } from '../BrukerContext';
import { useFagsakContext } from '../FagsakContext';
import { useBehandlingContext } from './context/BehandlingContext';
import Behandlingsresultat from './Sider/Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import { RegistrerSøknad } from './Sider/RegistrerSøknad/RegistrerSøknad';
import { SøknadProvider } from './Sider/RegistrerSøknad/SøknadContext';
import type { SideId } from './Sider/sider';
import { sider } from './Sider/sider';
import Simulering from './Sider/Simulering/Simulering';
import { SimuleringProvider } from './Sider/Simulering/SimuleringContext';
import { FeilutbetaltValutaTabellProvider } from './Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { SammensattKontrollsakProvider } from './Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext';
import Vedtak from './Sider/Vedtak/Vedtak';
import { Vilkårsvurdering } from './Sider/Vilkårsvurdering/Vilkårsvurdering';
import { VilkårsvurderingProvider } from './Sider/Vilkårsvurdering/VilkårsvurderingContext';
import { useTrackTidsbrukPåSide } from '../../../hooks/useTrackTidsbrukPåSide';
import { TidslinjeProvider } from '../../../komponenter/Tidslinje/TidslinjeContext';
import { hentSideHref } from '../../../utils/miljø';
import { RefusjonEøsTabellProvider } from './Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext';
import { VedtaksperioderProvider } from './Sider/Vedtak/Vedtaksperioder/VedtaksperioderContext';

export function BehandlingRouter() {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();
    const { behandling, leggTilBesøktSide } = useBehandlingContext();

    const location = useLocation();

    useTrackTidsbrukPåSide(fagsak, behandling);

    const sidevisning = hentSideHref(location.pathname);

    useEffect(() => {
        if (sidevisning) {
            leggTilBesøktSide(Object.entries(sider).find(([_, side]) => side.href === sidevisning)?.[0] as SideId);
        }
    }, [sidevisning]);

    return (
        <Routes>
            <Route path="/registrer-institusjon" element={<RegistrerInstitusjon åpenBehandling={behandling} />} />
            <Route
                path="/registrer-soknad"
                element={
                    <SøknadProvider åpenBehandling={behandling}>
                        <RegistrerSøknad />
                    </SøknadProvider>
                }
            />
            <Route path="/filtreringsregler" element={<Filtreringsregler åpenBehandling={behandling} />} />
            <Route
                path="/vilkaarsvurdering"
                element={
                    <VilkårsvurderingProvider åpenBehandling={behandling}>
                        <Vilkårsvurdering />
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
                        <FeilutbetaltValutaTabellProvider>
                            <RefusjonEøsTabellProvider>
                                <SammensattKontrollsakProvider åpenBehandling={behandling}>
                                    <VedtaksperioderProvider>
                                        <Vedtak åpenBehandling={behandling} bruker={bruker} />
                                    </VedtaksperioderProvider>
                                </SammensattKontrollsakProvider>
                            </RefusjonEøsTabellProvider>
                        </FeilutbetaltValutaTabellProvider>
                    </SimuleringProvider>
                }
            />
        </Routes>
    );
}
