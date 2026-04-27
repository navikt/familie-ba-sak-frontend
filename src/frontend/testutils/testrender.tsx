import React, { type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender, type RenderOptions, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import { AppProvider } from '../context/AppContext';
import { AuthContextProvider } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalContext';
import { lagSaksbehandler } from './testdata/saksbehandlerTestdata';
import { HttpContextProvider } from '../context/HttpContext';
import { SaksbehandlerProvider } from '../context/SaksbehandlerContext';
import { FeatureTogglesProvider } from '../context/TogglesContext';
import type { FeatureToggles } from '../typer/featureToggles';
import type { Saksbehandler } from '../typer/saksbehandler';
import { skruPåAlleToggles } from './mocks/handlers/featureToggleHandlers';

function lagQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
            },
        },
    });
}

interface Props extends PropsWithChildren {
    queryClient?: QueryClient;
    initialEntries?: [{ pathname: string }];
    saksbehandler?: Saksbehandler;
    fjernRessursSomLasterTimeout?: number;
    featureToggles?: FeatureToggles;
}

export function TestProviders({
    queryClient = lagQueryClient(), // Ny instans for hver test
    initialEntries = [{ pathname: '/' }],
    saksbehandler = lagSaksbehandler(),
    fjernRessursSomLasterTimeout = 0,
    featureToggles = skruPåAlleToggles(),
    children,
}: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <SaksbehandlerProvider saksbehandler={saksbehandler}>
                <AuthContextProvider>
                    <HttpContextProvider fjernRessursSomLasterTimeout={fjernRessursSomLasterTimeout}>
                        <FeatureTogglesProvider featureToggles={featureToggles}>
                            <AppProvider>
                                <ModalProvider>
                                    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
                                </ModalProvider>
                            </AppProvider>
                        </FeatureTogglesProvider>
                    </HttpContextProvider>
                </AuthContextProvider>
            </SaksbehandlerProvider>
        </QueryClientProvider>
    );
}

export function render(ui: React.ReactNode, options?: RenderOptions) {
    return {
        user: userEvent.setup(),
        screen: rtlScreen,
        ...rtlRender(ui, { wrapper: TestProviders, ...options }),
    };
}
