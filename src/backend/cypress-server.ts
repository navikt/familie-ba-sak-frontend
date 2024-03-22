import path from 'path';

import type { Express, Request, Response } from 'express';
// eslint-disable-next-line
import express from 'express';
import RateLimit from 'express-rate-limit';
import expressStaticGzip from 'express-static-gzip';

import { logInfo } from '@navikt/familie-logging';
import { byggDataRessurs } from '@navikt/familie-typer';

import {
    fagsakMock,
    klagebehandlingFixture,
    oppgaveMock,
    personMock,
    profileMock,
} from './mock-data';
import type { IKlagebehandling } from '../frontend/typer/klage';

// set up rate limiter: maximum of five requests per minute

const port = 8000;

const app: Express = express();
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));

app.post('/familie-ba-sak/api/oppgave/hent-oppgaver', (_, res) => {
    res.status(200).send(oppgaveMock);
});

// Må komme før /familie-ba-sak/api/fagsaker/*
app.get('/familie-ba-sak/api/fagsaker/*/hent-klagebehandlinger', (_, res) => {
    const klagebehandlinger: IKlagebehandling[] = [klagebehandlingFixture()];
    res.status(200).send(byggDataRessurs(klagebehandlinger));
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

app.get('/familie-ba-sak/api/fagsaker/*/hent-klagebehandlinger', (_, res) => {
    res.status(200).send(byggDataRessurs([klagebehandlingFixture()]));
});

app.get('*', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'frontend_production') });
});

app.listen(port, '0.0.0.0', () => {
    logInfo(`Server startet på port ${port}.`);
});
