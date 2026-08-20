import { NotFound } from '@komponenter/Error/NotFound';
import { TidslinjeProvider } from '@komponenter/Tidslinje/TidslinjeContext';
import { RegistrerSøknad } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/RegistrerSøknad';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { VilkårsvurderingContainer } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårsvurderingContainer';
import type { RouteObject } from 'react-router';

import Behandlingsresultat from './Sider/Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import { Simulering } from './Sider/Simulering/Simulering';
import { SimuleringContainer } from './Sider/Simulering/SimuleringContainer';
import { Vedtak } from './Sider/Vedtak/Vedtak';

export const behandlingRoutes: RouteObject[] = [
    {
        path: 'registrer-institusjon',
        element: <RegistrerInstitusjon />,
    },
    {
        path: 'registrer-soknad',
        element: <RegistrerSøknad />,
    },
    {
        path: 'filtreringsregler',
        element: <Filtreringsregler />,
    },
    {
        path: 'vilkaarsvurdering',
        element: <VilkårsvurderingContainer />,
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
            <SimuleringContainer>
                <Simulering />
            </SimuleringContainer>
        ),
    },
    {
        path: 'vedtak',
        element: (
            <VedtakContainer>
                <Vedtak />
            </VedtakContainer>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
