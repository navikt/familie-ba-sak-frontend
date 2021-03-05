import './index.less';
import 'nav-frontend-tabell-style';

import React from 'react';

import { init } from '@sentry/browser';
import * as ReactDOM from 'react-dom';

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

if (process.env.NODE_ENV === 'production') {
    import('@axe-core/react').then(({ default: axe }) => {
        axe(React, ReactDOM, 1000);
    });
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
);
