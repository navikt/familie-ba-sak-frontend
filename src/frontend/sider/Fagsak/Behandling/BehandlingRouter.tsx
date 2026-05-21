import { useEffect } from 'react';

import { useTrackTidsbrukPåSide } from '@hooks/useTrackTidsbrukPåSide';
import { TidslinjeProvider } from '@komponenter/Tidslinje/TidslinjeContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { hentSideHref } from '@utils/miljø';
import { Route, Routes, useLocation } from 'react-router';

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
import { Vedtak } from './Sider/Vedtak/Vedtak';
import { Vilkårsvurdering } from './Sider/Vilkårsvurdering/Vilkårsvurdering';
import { VilkårsvurderingProvider } from './Sider/Vilkårsvurdering/VilkårsvurderingContext';

export function BehandlingRouter() {
    const { fagsak } = useFagsakContext();
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
                    <SøknadProvider>
                        <RegistrerSøknad />
                    </SøknadProvider>
                }
            />
            <Route path="/filtreringsregler" element={<Filtreringsregler />} />
            <Route
                path="/vilkaarsvurdering"
                element={
                    <VilkårsvurderingProvider>
                        <Vilkårsvurdering />
                    </VilkårsvurderingProvider>
                }
            />
            <Route
                path="/tilkjent-ytelse"
                element={
                    <TidslinjeProvider>
                        <Behandlingsresultat />
                    </TidslinjeProvider>
                }
            />
            <Route
                path="/simulering"
                element={
                    <SimuleringProvider>
                        <Simulering />
                    </SimuleringProvider>
                }
            />
            <Route
                path="/vedtak"
                element={
                    <SimuleringProvider>
                        <VedtakContainer>
                            <Vedtak />
                        </VedtakContainer>
                    </SimuleringProvider>
                }
            />
        </Routes>
    );
}
