import './index.less';
import 'nav-frontend-tabell-style';

import * as React from 'react';

import { init } from '@sentry/browser';
import axe from 'react-axe';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import { version } from '../../package.json';
import App from './komponenter/App';

const environment = window.location.hostname;

init({
    dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
    environment,
    release: version,
    enabled: process.env.NODE_ENV !== 'development',
});

if (process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM, 1000);
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
