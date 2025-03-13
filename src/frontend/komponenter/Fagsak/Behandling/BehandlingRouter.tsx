import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router';

import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import RegistrerSøknad from './Sider/RegistrerSøknad/RegistrerSøknad';
import { sider } from './Sider/sider';
import type { SideId } from './Sider/sider';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { VedtakStegProvider } from '../../../context/behandlingContext/useVedtakSteg';
import { EøsProvider } from '../../../context/Eøs/EøsContext';
import { SimuleringProvider } from '../../../context/SimuleringContext';
import { SøknadProvider } from '../../../context/SøknadContext';
import { TidslinjeProvider } from '../../../context/TidslinjeContext';
import { VilkårsvurderingProvider } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type { IPersonInfo } from '../../../typer/person';
import { hentSideHref } from '../../../utils/miljø';
import Behandlingsresultat from '../Behandlingsresultat/Behandlingsresultat';
import Simulering from '../Simulering/Simulering';
import OppsummeringVedtak from '../Vedtak/OppsummeringVedtak';
import { SammensattKontrollsakProvider } from '../Vedtak/SammensattKontrollsak/useSammensattKontrollsak';
import Vilkårsvurdering from './Sider/Vilkårsvurdering/Vilkårsvurdering';

interface Props {
    bruker: IPersonInfo;
}

const BehandlingRouter: React.FC<Props> = ({ bruker }) => {
    const location = useLocation();
    const { behandling, leggTilBesøktSide } = useBehandling();

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
                        <EøsProvider åpenBehandling={behandling}>
                            <Behandlingsresultat åpenBehandling={behandling} />
                        </EøsProvider>
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
