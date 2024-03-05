import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import Behandlingsresultat from './Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Filtreringsregler/Filtreringsregler';
import RegistrerInstitusjon from './InstitusjonOgVerge/RegistrerInstitusjon';
import Simulering from './Simulering/Simulering';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Vilkårsvurdering from './Vilkårsvurdering/Vilkårsvurdering';
import { useBehandling } from '../../context/behandlingContext/BehandlingContext';
import { VedtaksperioderProvider } from '../../context/behandlingContext/useVedtaksperioder';
import { EøsProvider } from '../../context/Eøs/EøsContext';
import { InstitusjonOgVergeProvider } from '../../context/InstitusjonOgVergeContext';
import { SimuleringProvider } from '../../context/SimuleringContext';
import { SøknadProvider } from '../../context/SøknadContext';
import { TidslinjeProvider } from '../../context/TidslinjeContext';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type { IPersonInfo } from '../../typer/person';
import { useAmplitude } from '../../utils/amplitude';
import { hentSideHref } from '../../utils/miljø';
import type { SideId } from '../Felleskomponenter/Venstremeny/sider';
import { sider } from '../Felleskomponenter/Venstremeny/sider';

interface Props {
    bruker: IPersonInfo;
}

const BehandlingRouter: React.FC<Props> = ({ bruker }) => {
    const { loggSidevisning } = useAmplitude();
    const location = useLocation();
    const { behandling, leggTilBesøktSide } = useBehandling();

    const sidevisning = hentSideHref(location.pathname);
    useEffect(() => {
        if (sidevisning) {
            loggSidevisning(sidevisning);
            leggTilBesøktSide(
                Object.entries(sider).find(([_, side]) => side.href === sidevisning)?.[0] as SideId
            );
        }
    }, [sidevisning]);

    return (
        <Routes>
            <Route
                path="/registrer-institusjon"
                element={
                    <InstitusjonOgVergeProvider åpenBehandling={behandling}>
                        <RegistrerInstitusjon />
                    </InstitusjonOgVergeProvider>
                }
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
                        <VedtaksperioderProvider åpenBehandling={behandling}>
                            <OppsummeringVedtak åpenBehandling={behandling} bruker={bruker} />
                        </VedtaksperioderProvider>
                    </SimuleringProvider>
                }
            />
        </Routes>
    );
};

export default BehandlingRouter;
