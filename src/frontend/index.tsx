import './index.less';

import * as React from 'react';
import axe from 'react-axe';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { init } from '@sentry/browser';

import App from './komponenter/App';

/* tslint:disable */
const packageConfig = require('../../package.json');
/* tslint:enable */
const environment = window.location.hostname;

init({
    dsn: 'https://10239ce4baed4db79d080d85f08b5878@sentry.gc.nav.no/26',
    environment,
    release: packageConfig.version,
    enabled: process.env.NODE_ENV !== 'development',
});

if (process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM, 1000);
}

const rootElement = document.getElementById('app');
const renderApp = (Component: React.ComponentType<{}>): void => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootElement
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./komponenter/App', () => {
        const NewApp = require('./komponenter/App').default;
        renderApp(NewApp);
    });
}
