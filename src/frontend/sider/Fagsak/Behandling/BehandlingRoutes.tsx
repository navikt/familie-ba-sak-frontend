import { TidslinjeProvider } from '@komponenter/Tidslinje/TidslinjeContext';
import type { RouteObject } from 'react-router';

import Behandlingsresultat from './Sider/Behandlingsresultat/Behandlingsresultat';
import Filtreringsregler from './Sider/FiltreringFødselshendelser/Filtreringsregler';
import RegistrerInstitusjon from './Sider/RegistrerInstitusjon/RegistrerInstitusjon';
import { RegistrerSøknad } from './Sider/RegistrerSøknad/RegistrerSøknad';
import { SøknadProvider } from './Sider/RegistrerSøknad/SøknadContext';
import Simulering from './Sider/Simulering/Simulering';
import { SimuleringProvider } from './Sider/Simulering/SimuleringContext';
import { FeilutbetaltValutaTabellProvider } from './Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabellProvider } from './Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsakProvider } from './Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext';
import { Vedtak } from './Sider/Vedtak/Vedtak';
import { VedtaksperioderProvider } from './Sider/Vedtak/Vedtaksperioder/VedtaksperioderContext';
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
                <Vilkårsvurdering />
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
                <FeilutbetaltValutaTabellProvider>
                    <RefusjonEøsTabellProvider>
                        <SammensattKontrollsakProvider>
                            <VedtaksperioderProvider>
                                <Vedtak />
                            </VedtaksperioderProvider>
                        </SammensattKontrollsakProvider>
                    </RefusjonEøsTabellProvider>
                </FeilutbetaltValutaTabellProvider>
            </SimuleringProvider>
        ),
    },
];
