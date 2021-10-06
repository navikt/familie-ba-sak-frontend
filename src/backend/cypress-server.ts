import path from 'path';

import bodyParser from 'body-parser';
import { Express, Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';

import { logInfo } from '@navikt/familie-logging';

import { fagsakMock, oppgaveMock, personMock, profileMock } from './mock-data';

// eslint-disable-next-line
const express = require('express');

const port = 8000;

const app: Express = express();

app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
app.use(bodyParser.json());

app.post('/familie-ba-sak/api/feature', (req, res) => {
    return res.status(200).send({
        data: req.body.reduce((prev: object, curr: string) => ({ ...prev, [curr]: true }), {}),
        status: 'SUKSESS',
        melding: 'Innhenting av data var vellykket',
        frontendFeilmelding: null,
        stacktrace: null,
    });
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
app.get('*', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'frontend_production') });
});

app.listen(port, '0.0.0.0', () => {
    logInfo(`Server startet på port ${port}.`);
});
