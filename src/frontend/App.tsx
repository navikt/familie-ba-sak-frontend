import type { FC } from 'react';
import { useEffect } from 'react';

import '@navikt/ds-css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Container } from './Container';
import { AppProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import { HttpContextProvider } from './context/HttpContext';
import { ModalProvider } from './context/ModalContext';
import { SaksbehandlerProvider } from './context/SaksbehandlerContext';
import { FeatureTogglesProvider } from './context/TogglesContext';
import { useStartUmami } from './hooks/useStartUmami';
import { ErrorBoundary, ErrorBoundaryMedSaksbehandler } from './komponenter/ErrorBoundary/ErrorBoundary';
import { initGrafanaFaro } from './utils/grafanaFaro';
import { erProd } from './utils/miljø';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Fungerer ikke så bra med global "Systemet laster" spinner, på sikt kan vi kanskje enable retries
        },
    },
});

const App: FC = () => {
    useStartUmami();

    useEffect(() => {
        initGrafanaFaro();
    }, []);

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                {!erProd() && <ReactQueryDevtools position={'right'} initialIsOpen={false} />}
                <SaksbehandlerProvider>
                    <ErrorBoundaryMedSaksbehandler>
                        <AuthContextProvider>
                            <HttpContextProvider>
                                <FeatureTogglesProvider>
                                    <AppProvider>
                                        <ModalProvider>
                                            <Container />
                                        </ModalProvider>
                                    </AppProvider>
                                </FeatureTogglesProvider>
                            </HttpContextProvider>
                        </AuthContextProvider>
                    </ErrorBoundaryMedSaksbehandler>
                </SaksbehandlerProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default App;
