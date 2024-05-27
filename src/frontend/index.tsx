import './index.less';

import React from 'react';

import axe from '@axe-core/react';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { init } from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { setDefaultOptions } from 'date-fns';
import { nb } from 'date-fns/locale';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './komponenter/App';

// eslint-disable-next-line
const packageConfig = require('../../package.json');

// Setter default locale til norsk bokmål for date-fns
setDefaultOptions({ locale: nb });

const environment = window.location.hostname;

if (process.env.NODE_ENV !== 'development') {
    init({
        dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
        environment,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 0.2,
    });

    initializeFaro({
        isolate: true,
        url: 'https://telemetry.ekstern.dev.nav.no/collect',
        app: {
            name: 'familie-ba-sak-frontend',
        },
    });
}

if (process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM, 1000);
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
