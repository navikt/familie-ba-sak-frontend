import '@navikt/ds-css';
import './index.css';

import { AppProvider } from '@context/AppContext';
import { AuthContextProvider } from '@context/AuthContext';
import { HttpContextProvider } from '@context/HttpContext';
import { ModalProvider } from '@context/ModalContext';
import { SaksbehandlerProvider } from '@context/SaksbehandlerContext';
import { FeatureTogglesProvider } from '@context/TogglesContext';
import { useStartUmami } from '@hooks/useStartUmami';
import { ErrorBoundary, ErrorBoundaryMedSaksbehandler } from '@komponenter/ErrorBoundary/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { erProd } from '@utils/miljø';

import { Container } from './Container';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Fungerer ikke så bra med global "Systemet laster" spinner, på sikt kan vi kanskje enable retries
        },
    },
});

export function App() {
    useStartUmami();

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
}
