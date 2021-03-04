import './index.less';
import 'nav-frontend-tabell-style';

import * as React from 'react';

import { init } from '@sentry/browser';
import axe from 'axe-core';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import App from './komponenter/App';

// eslint-disable-next-line
const packageConfig = require('../../package.json');

const environment = window.location.hostname;

init({
    dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
    environment,
    release: packageConfig.version,
    enabled: process.env.NODE_ENV !== 'development',
});

if (process.env.NODE_ENV !== 'production') {
    axe.run()
        .then(results => {
            if (results.violations.length) {
                results.violations.forEach(violation => {
                    console.log(
                        `Axe feil: ${violation.description} (${violation.helpUrl}) som påvirker: `
                    );
                    violation.nodes.forEach(node => {
                        console.log(`${node.failureSummary}`);
                    });
                });
            }
        })
        .catch(err => {
            console.error('Something bad happened:', err.message);
        });
}

const rootElement = document.getElementById('app');
const renderApp = (Component: React.ComponentType): void => {
    ReactDOM.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>,
        rootElement
    );
};

renderApp(hot(module)(App));
