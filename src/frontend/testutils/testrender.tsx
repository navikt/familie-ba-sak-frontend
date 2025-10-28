import React from 'react';
import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender, type RenderOptions, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { AppProvider } from '../context/AppContext';
import { AuthContextProvider } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalContext';
import { SaksbehandlerTestdata } from './testdata/saksbehandlerTestdata';
import { HttpContextProvider } from '../context/HttpContext';
import { FeatureTogglesProvider } from '../context/TogglesContext';
import type { FeatureToggles } from '../typer/featureToggles';
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
    saksbehandler?: ISaksbehandler;
    fjernRessursSomLasterTimeout?: number;
    featureToggles?: FeatureToggles;
}

export function TestProviders({
    queryClient = lagQueryClient(), // Ny instans for hver test
    initialEntries = [{ pathname: '/' }],
    saksbehandler = SaksbehandlerTestdata.lagSaksbehandler(),
    fjernRessursSomLasterTimeout = 0,
    featureToggles = skruPåAlleToggles(),
    children,
}: Props) {
    return (
        <AuthContextProvider autentisertSaksbehandler={saksbehandler}>
            <HttpContextProvider fjernRessursSomLasterTimeout={fjernRessursSomLasterTimeout}>
                <QueryClientProvider client={queryClient}>
                    <FeatureTogglesProvider featureToggles={featureToggles}>
                        <AppProvider>
                            <ModalProvider>
                                <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
                            </ModalProvider>
                        </AppProvider>
                    </FeatureTogglesProvider>
                </QueryClientProvider>
            </HttpContextProvider>
        </AuthContextProvider>
    );
}

export function render(ui: React.ReactNode, options?: RenderOptions) {
    return {
        user: userEvent.setup(),
        screen: rtlScreen,
        ...rtlRender(ui, { wrapper: TestProviders, ...options }),
    };
}
