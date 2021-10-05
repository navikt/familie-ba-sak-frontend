import path from 'path';

import bodyParser from 'body-parser';
import { Express, Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { logInfo } from '@navikt/familie-logging';

import { featureMock, oppgaveMock, fagsakMock, personMock, profileMock } from './mock-data';

// eslint-disable-next-line
const webpackDevConfig = require('../webpack/webpack.dev');
// eslint-disable-next-line
const express = require('express');

const port = 8000;

const app: Express = express();

let middleware;

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackDevConfig);
    middleware = webpackDevMiddleware(compiler, {
        // eslint-disable-next-line
        // @ts-ignore
        publicPath: webpackDevConfig.output.publicPath,
        writeToDisk: true,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
}

app.post('/familie-ba-sak/api/feature', (_, res) => {
    res.status(200).send(featureMock);
});
app.post('/familie-ba-sak/api/oppgave/hent-oppgaver', (_, res) => {
    res.status(200).send(oppgaveMock);
});
app.get('/familie-ba-sak/api/fagsaker/*', (_, res) => {
    res.status(200).send(fagsakMock);
});
app.get('/familie-ba-sak/api/person', (_, res) => {
    res.status(200).send(personMock);
});
app.get('/user/profile', (_, res) => {
    res.status(200).send(profileMock);
});

// Sett opp bodyParser og router etter proxy. Spesielt viktig med tanke på større payloads som blir parset av bodyParser
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.get('*', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'frontend_production') });
});

app.listen(port, '0.0.0.0', () => {
    logInfo(`Server startet på port ${port}.`);
});
