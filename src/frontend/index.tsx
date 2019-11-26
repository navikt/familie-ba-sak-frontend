import { init } from '@sentry/browser';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './komponenter/App';

/* tslint:disable */
const packageConfig = require('../../package.json');
/* tslint:enable */

import './index.less';

if (process.env.NODE_ENV !== 'development') {
    const environment = window.location.hostname;

    init({
        dsn: 'https://eca7c1c693ca462c905a29bd6327a657@sentry.nav.no/12',
        environment,
        release: packageConfig.version,
    });
}

const rootElement = document.getElementById('app');
const renderApp = (Component: React.ComponentType<{}>): void => {
    render(
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
