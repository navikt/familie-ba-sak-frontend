import path from 'path';

import type { Express, Request, Response } from 'express';
// eslint-disable-next-line
import express from 'express';
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

const port = 8000;

const app: Express = express();

app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));

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

app.get('/familie-ks-sak/api/fagsaker/*/hent-klagebehandlinger', (_, res) => {
    res.status(200).send(byggDataRessurs([klagebehandlingFixture()]));
});

app.get('*', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'frontend_production') });
});

app.listen(port, '0.0.0.0', () => {
    logInfo(`Server startet på port ${port}.`);
});
