import * as React from 'react';

import Modal from 'nav-frontend-modal';

import { ISaksbehandler } from '@navikt/familie-typer';

import { hentInnloggetBruker } from '../api/saksbehandler';
import { AppProvider } from '../context/AppContext';
import { useAmplitude } from '../utils/amplitude';
import Container from './Container';
import ErrorBoundary from './Felleskomponenter/ErrorBoundary/ErrorBoundary';

Modal.setAppElement(document.getElementById('modal-a11y-wrapper'));

const App: React.FC = () => {
    const { loggSkjermstørrelse } = useAmplitude();
    const [autentisertSaksbehandler, settInnloggetSaksbehandler] = React.useState<
        ISaksbehandler | undefined
    >(undefined);

    React.useEffect(() => {
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
