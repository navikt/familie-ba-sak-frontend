import * as React from 'react';

import '@navikt/ds-css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ISaksbehandler } from '@navikt/familie-typer';

import Container from './Container';
import { hentInnloggetBruker } from '../api/saksbehandler';
import { AppProvider } from '../context/AppContext';
import { initGrafanaFaro } from '../utils/grafanaFaro';
import ErrorBoundary from './Felleskomponenter/ErrorBoundary/ErrorBoundary';

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [autentisertSaksbehandler, settInnloggetSaksbehandler] = React.useState<
        ISaksbehandler | undefined
    >(undefined);

    React.useEffect(() => {
        initGrafanaFaro();
        hentInnloggetBruker().then((innhentetInnloggetSaksbehandler: ISaksbehandler) => {
            settInnloggetSaksbehandler(innhentetInnloggetSaksbehandler);
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary autentisertSaksbehandler={autentisertSaksbehandler}>
                <AppProvider autentisertSaksbehandler={autentisertSaksbehandler}>
                    <Container />
                </AppProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
};

export default App;
