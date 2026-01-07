import * as React from 'react';

import '@navikt/ds-css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { hentInnloggetBruker } from './api/saksbehandler';
import Container from './Container';
import { AppProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import { HttpContextProvider } from './context/HttpContext';
import { ModalProvider } from './context/ModalContext';
import { useStartUmami } from './hooks/useStartUmami';
import { ErrorBoundary } from './komponenter/ErrorBoundary/ErrorBoundary';
import { initGrafanaFaro } from './utils/grafanaFaro';
import { erProd } from './utils/miljø';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Fungerer ikke så bra med global "Systemet laster" spinner, på sikt kan vi kanskje enable retries
        },
    },
});

const App: React.FC = () => {
    const [autentisertSaksbehandler, settInnloggetSaksbehandler] = React.useState<ISaksbehandler | undefined>(
        undefined
    );
    useStartUmami();

    React.useEffect(() => {
        initGrafanaFaro();
        hentInnloggetBruker().then((innhentetInnloggetSaksbehandler: ISaksbehandler) => {
            settInnloggetSaksbehandler(innhentetInnloggetSaksbehandler);
        });
    }, []);

    return (
        <ErrorBoundary autentisertSaksbehandler={autentisertSaksbehandler}>
            <AuthContextProvider autentisertSaksbehandler={autentisertSaksbehandler}>
                <HttpContextProvider>
                    <QueryClientProvider client={queryClient}>
                        {!erProd() && <ReactQueryDevtools position={'right'} initialIsOpen={false} />}
                        <AppProvider>
                            <ModalProvider>
                                <Container />
                            </ModalProvider>
                        </AppProvider>
                    </QueryClientProvider>
                </HttpContextProvider>
            </AuthContextProvider>
        </ErrorBoundary>
    );
};

export default App;
