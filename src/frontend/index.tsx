import { StrictMode } from 'react';

import { init } from '@nais/apm';
import { setDefaultOptions } from 'date-fns';
import { nb } from 'date-fns/locale';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { erLokal } from './utils/miljø';

// Setter default locale til norsk bokmål for date-fns
setDefaultOptions({ locale: nb });

if (!erLokal()) {
    init({
        tracing: true,
    });
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
