import * as React from 'react';

import '@navikt/ds-css';

import type { ISaksbehandler } from '@navikt/familie-typer';

import Container from './Container';
import { hentInnloggetBruker } from '../api/saksbehandler';
import { AppProvider } from '../context/AppContext';
import { useAmplitude } from '../utils/amplitude';
import { initGrafanaFaro } from '../utils/grafanaFaro';
import ErrorBoundary from './Felleskomponenter/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
    const { loggSkjermstørrelse } = useAmplitude();
    const [autentisertSaksbehandler, settInnloggetSaksbehandler] = React.useState<
        ISaksbehandler | undefined
    >(undefined);

    React.useEffect(() => {
        initGrafanaFaro();
        loggSkjermstørrelse();
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
