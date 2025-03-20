import * as React from 'react';

import '@navikt/ds-css';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { hentInnloggetBruker } from './api/saksbehandler';
import Container from './Container';
import { AppProvider } from './context/AppContext';
import { useStartUmami } from './hooks/useStartUmami';
import ErrorBoundary from './komponenter/ErrorBoundary/ErrorBoundary';
import { initGrafanaFaro } from './utils/grafanaFaro';

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
            <AppProvider autentisertSaksbehandler={autentisertSaksbehandler}>
                <Container />
            </AppProvider>
        </ErrorBoundary>
    );
};

export default App;
