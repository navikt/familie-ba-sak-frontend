import Modal from 'nav-frontend-modal';
import * as React from 'react';
import ErrorBoundary from './Felleskomponenter/ErrorBoundary/ErrorBoundary';
import { AppProvider } from '../context/AppContext';
import { ISaksbehandler } from '@navikt/familie-typer';
import { hentInnloggetBruker } from '../api/saksbehandler';
import Container from './Container';

Modal.setAppElement(document.getElementById('modal-a11y-wrapper'));

const App: React.FC = () => {
    const [autentisertSaksbehandler, settInnloggetSaksbehandler] = React.useState<
        ISaksbehandler | undefined
    >(undefined);

    React.useEffect(() => {
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
