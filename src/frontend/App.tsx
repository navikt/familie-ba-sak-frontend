import * as React from 'react';

import '@navikt/ds-css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { hentInnloggetBruker } from './api/saksbehandler';
import Container from './Container';
import { AppProvider } from './context/AppContext';
import { AuthOgHttpProvider } from './context/AuthContext';
import { useStartUmami } from './hooks/useStartUmami';
import ErrorBoundary from './komponenter/ErrorBoundary/ErrorBoundary';
import { initGrafanaFaro } from './utils/grafanaFaro';

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [autentisertSaksbehandler, settInnloggetSaksbehandler] = React.useState<
        ISaksbehandler | undefined
    >(undefined);
    useStartUmami();

    React.useEffect(() => {
        initGrafanaFaro();
        hentInnloggetBruker().then((innhentetInnloggetSaksbehandler: ISaksbehandler) => {
            settInnloggetSaksbehandler(innhentetInnloggetSaksbehandler);
        });
    }, []);

    return (
        <ErrorBoundary autentisertSaksbehandler={autentisertSaksbehandler}>
            <AuthOgHttpProvider autentisertSaksbehandler={autentisertSaksbehandler}>
                <QueryClientProvider client={queryClient}>
                    <AppProvider>
                        <Container />
                    </AppProvider>
                </QueryClientProvider>
            </AuthOgHttpProvider>
        </ErrorBoundary>
    );
};

export default App;
