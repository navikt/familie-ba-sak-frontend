import React from 'react';
import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender, type RenderOptions, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

import { AppProvider } from '../context/AppContext';
import { AuthOgHttpProvider } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalContext';
import { FeatureTogglesProvider } from '../context/TogglesContext';
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

export function TestProviders({ children }: PropsWithChildren) {
    const queryClient = lagQueryClient(); // Ny instans for hver test
    return (
        <AuthOgHttpProvider autentisertSaksbehandler={undefined}>
            <QueryClientProvider client={queryClient}>
                <FeatureTogglesProvider featureToggles={skruPåAlleToggles()}>
                    <AppProvider>
                        <ModalProvider>
                            <BrowserRouter>{children}</BrowserRouter>
                        </ModalProvider>
                    </AppProvider>
                </FeatureTogglesProvider>
            </QueryClientProvider>
        </AuthOgHttpProvider>
    );
}

export function render(ui: React.ReactNode, options?: RenderOptions) {
    return {
        user: userEvent.setup(),
        screen: rtlScreen,
        ...rtlRender(ui, { wrapper: TestProviders, ...options }),
    };
}
