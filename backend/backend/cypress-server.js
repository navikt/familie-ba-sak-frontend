import path from 'path';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import { logInfo } from '@navikt/familie-logging';
import { byggDataRessurs } from '@navikt/familie-typer';
import { fagsakMock, klagebehandlingFixture, oppgaveMock, personMock, profileMock } from './mock-data';
const port = 8000;
const app = express();
app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
app.post('/familie-ba-sak/api/oppgave/hent-oppgaver', (_, res) => {
    res.status(200).send(oppgaveMock);
});
// Må komme før /familie-ba-sak/api/fagsaker/*
app.get('/familie-ba-sak/api/fagsaker/*splat/hent-klagebehandlinger', (_, res) => {
    const klagebehandlinger = [klagebehandlingFixture()];
    res.status(200).send(byggDataRessurs(klagebehandlinger));
});
app.get('/familie-ba-sak/api/fagsaker/*splat', (_, res) => {
    res.status(200).send(fagsakMock);
});
app.post('/familie-ba-sak/api/person', (_, res) => {
    res.status(200).send(personMock);
});
app.get('/user/profile', (_, res) => {
    res.status(200).send(profileMock);
});
app.get('/familie-ba-sak/api/fagsaker/*splat/hent-klagebehandlinger', (_, res) => {
    res.status(200).send(byggDataRessurs([klagebehandlingFixture()]));
});
app.get('*splat', (_, res) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'frontend_production') });
});
app.listen(port, '0.0.0.0', () => {
    logInfo(`Server startet på port ${port}.`);
});
