import { NotFound } from '@komponenter/Error/NotFound';
import { TidslinjeProvider } from '@komponenter/Tidslinje/TidslinjeContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { EkspanderbareVilkårResultatRaderProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { VilkårsvurderingPanelerProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårsvurderingPanelerContext';
import type { RouteObject } from 'react-router';

import Behandlingsresultat from './Sider/Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import { RegistrerSøknad } from './Sider/RegistrerSøknad/RegistrerSøknad';
import { SøknadProvider } from './Sider/RegistrerSøknad/SøknadContext';
import Simulering from './Sider/Simulering/Simulering';
import { SimuleringProvider } from './Sider/Simulering/SimuleringContext';
import { Vedtak } from './Sider/Vedtak/Vedtak';
import { Vilkårsvurdering } from './Sider/Vilkårsvurdering/Vilkårsvurdering';
import { VilkårsvurderingProvider } from './Sider/Vilkårsvurdering/VilkårsvurderingContext';

export const behandlingRoutes: RouteObject[] = [
    {
        path: 'registrer-institusjon',
        element: <RegistrerInstitusjon />,
    },
    {
        path: 'registrer-soknad',
        element: (
            <SøknadProvider>
                <RegistrerSøknad />
            </SøknadProvider>
        ),
    },
    {
        path: 'filtreringsregler',
        element: <Filtreringsregler />,
    },
    {
        path: 'vilkaarsvurdering',
        element: (
            <VilkårsvurderingProvider>
                <VilkårsvurderingPanelerProvider>
                    <EkspanderbareVilkårResultatRaderProvider>
                        <Vilkårsvurdering />
                    </EkspanderbareVilkårResultatRaderProvider>
                </VilkårsvurderingPanelerProvider>
            </VilkårsvurderingProvider>
        ),
    },
    {
        path: 'tilkjent-ytelse',
        element: (
            <TidslinjeProvider>
                <Behandlingsresultat />
            </TidslinjeProvider>
        ),
    },
    {
        path: 'simulering',
        element: (
            <SimuleringProvider>
                <Simulering />
            </SimuleringProvider>
        ),
    },
    {
        path: 'vedtak',
        element: (
            <SimuleringProvider>
                <VedtakContainer>
                    <Vedtak />
                </VedtakContainer>
            </SimuleringProvider>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
