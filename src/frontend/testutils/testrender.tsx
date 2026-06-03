import type { ReactNode, PropsWithChildren } from 'react';

import { AuthContextProvider } from '@context/AuthContext';
import { HttpContextProvider } from '@context/HttpContext';
import { ManglerTilgangModalProvider } from '@context/ManglerTilgangModalContext';
import { ModalProvider } from '@context/ModalContext';
import { SaksbehandlerProvider } from '@context/SaksbehandlerContext';
import { TekniskFeilModalProvider } from '@context/TekniskFeilModalContext';
import { ToastProvider } from '@context/ToastContext';
import { FeatureTogglesProvider } from '@context/TogglesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender, type RenderOptions, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FeatureToggles } from '@typer/featureToggles';
import type { Saksbehandler } from '@typer/saksbehandler';
import { MemoryRouter } from 'react-router';

import { skruPåAlleToggles } from './mocks/handlers/featureToggleHandlers';
import { lagSaksbehandler } from './testdata/saksbehandlerTestdata';

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
        <TekniskFeilModalProvider>
            <ManglerTilgangModalProvider>
                <QueryClientProvider client={queryClient}>
                    <SaksbehandlerProvider saksbehandler={saksbehandler}>
                        <AuthContextProvider>
                            <HttpContextProvider fjernRessursSomLasterTimeout={fjernRessursSomLasterTimeout}>
                                <FeatureTogglesProvider featureToggles={featureToggles}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
                                        </ToastProvider>
                                    </ModalProvider>
                                </FeatureTogglesProvider>
                            </HttpContextProvider>
                        </AuthContextProvider>
                    </SaksbehandlerProvider>
                </QueryClientProvider>
            </ManglerTilgangModalProvider>
        </TekniskFeilModalProvider>
    );
}

export function render(ui: ReactNode, options?: RenderOptions) {
    return {
        user: userEvent.setup(),
        screen: rtlScreen,
        ...rtlRender(ui, { wrapper: TestProviders, ...options }),
    };
}
