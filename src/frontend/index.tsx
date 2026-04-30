import { StrictMode } from 'react';

import { setDefaultOptions } from 'date-fns';
import { nb } from 'date-fns/locale';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { initGrafanaFaro } from './grafana';
import { initSentry } from './sentry';
import { erLokal } from './utils/miljø';

// Setter default locale til norsk bokmål for date-fns
setDefaultOptions({ locale: nb });

if (!erLokal()) {
    initSentry();
    initGrafanaFaro();
}

if (erLokal()) {
    (async () => {
        const [{ default: axe }, { default: React }] = await Promise.all([import('@axe-core/react'), import('react')]);
        axe(React, ReactDOM, 1000);
    })();
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
