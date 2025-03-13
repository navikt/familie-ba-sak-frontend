import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router';

import Behandlingsresultat from './Sider/Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import RegistrerSøknad from './Sider/RegistrerSøknad/RegistrerSøknad';
import { sider } from './Sider/sider';
import type { SideId } from './Sider/sider';
import Simulering from './Sider/Simulering/Simulering';
import OppsummeringVedtak from './Sider/Vedtak/OppsummeringVedtak';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { VedtakStegProvider } from '../../../context/behandlingContext/useVedtakSteg';
import { SimuleringProvider } from '../../../context/SimuleringContext';
import { SøknadProvider } from '../../../context/SøknadContext';
import { TidslinjeProvider } from '../../../context/TidslinjeContext';
import { VilkårsvurderingProvider } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { useTrackTidsbrukPåSide } from '../../../hooks/useTrackTidsbrukPåSide';
import type { IPersonInfo } from '../../../typer/person';
import { hentSideHref } from '../../../utils/miljø';
import { SammensattKontrollsakProvider } from './Sider/Vedtak/SammensattKontrollsak/useSammensattKontrollsak';
import Vilkårsvurdering from './Sider/Vilkårsvurdering/Vilkårsvurdering';
import type { IMinimalFagsak } from '../../../typer/fagsak';

interface Props {
    bruker: IPersonInfo;
    fagsak: IMinimalFagsak;
}

const BehandlingRouter: React.FC<Props> = ({ bruker, fagsak }) => {
    const location = useLocation();
    const { behandling, leggTilBesøktSide } = useBehandling();
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
                        <VedtakStegProvider åpenBehandling={behandling}>
                            <SammensattKontrollsakProvider åpenBehandling={behandling}>
                                <OppsummeringVedtak åpenBehandling={behandling} bruker={bruker} />
                            </SammensattKontrollsakProvider>
                        </VedtakStegProvider>
                    </SimuleringProvider>
                }
            />
        </Routes>
    );
};

export default BehandlingRouter;
