import '@navikt/ds-css';
import './index.css';

import { AuthContextProvider } from '@context/AuthContext';
import { HttpContextProvider } from '@context/HttpContext';
import { ManglerTilgangModalProvider } from '@context/ManglerTilgangModalContext';
import { ModalProvider } from '@context/ModalContext';
import { SaksbehandlerProvider } from '@context/SaksbehandlerContext';
import { TekniskFeilModalProvider } from '@context/TekniskFeilModalContext';
import { ToastProvider } from '@context/ToastContext';
import { FeatureTogglesProvider } from '@context/TogglesContext';
import { useStartUmami } from '@hooks/useStartUmami';
import { ErrorBoundary } from '@komponenter/ErrorBoundary/ErrorBoundary';
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
            <TekniskFeilModalProvider>
                <ManglerTilgangModalProvider>
                    <QueryClientProvider client={queryClient}>
                        {!erProd() && <ReactQueryDevtools position={'right'} initialIsOpen={false} />}
                        <SaksbehandlerProvider>
                            <AuthContextProvider>
                                <HttpContextProvider>
                                    <FeatureTogglesProvider>
                                        <ModalProvider>
                                            <ToastProvider>
                                                <Container />
                                            </ToastProvider>
                                        </ModalProvider>
                                    </FeatureTogglesProvider>
                                </HttpContextProvider>
                            </AuthContextProvider>
                        </SaksbehandlerProvider>
                    </QueryClientProvider>
                </ManglerTilgangModalProvider>
            </TekniskFeilModalProvider>
        </ErrorBoundary>
    );
}
