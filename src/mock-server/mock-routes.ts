import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { vedtakHtml } from './mock/vedtak';

const delayMs = 20;
const app = express();
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

const lesMockFil = (filnavn: string) => {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
};

app.get('/familie-ba-sak/api/fagsaker/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    setTimeout(() => res.send(lesMockFil(`fagsak-${id}.json`)), delayMs);
});

app.get('/familie-ba-sak/api/person', (_: Request, res: Response) => {
    setTimeout(() => res.status(200).send(lesMockFil(`person-1.json`)), delayMs);
});

app.get('/user/profile', (_: Request, res: Response) => {
    res.send({
        displayName: 'Test Testersen',
        enhet: '8888',
    });
});

app.get('/familie-ba-sak/api/dokument/vedtak-html/3', (_: Request, res: Response) => {
    setTimeout(
        () =>
            res.send({
                data: vedtakHtml,
                status: 'SUKSESS',
            }),
        delayMs
    );
});

app.post('/familie-ba-sak/api/behandlinger', (_: Request, res: Response) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.post('/familie-ba-sak/api/fagsaker/1/vedtak', (_: Request, res: Response) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.get('/familie-ba-sak/api/logg/2', (_: Request, res: Response) => {
    setTimeout(() => res.send(lesMockFil(`logg-2.json`)), delayMs);
});

app.get('/familie-ba-sak/api/vedtak/oversikt/2', (_: Request, res: Response) => {
    console.log('Truffet mock-endepunkt for beregning-oversikt');
    setTimeout(() => res.send(lesMockFil(`beregning-oversikt-1.json`)), delayMs);
});

app.post('/familie-ba-sak/api/fagsaker/sok', (req: Request, res: Response) => {
    const søkparam = req.body;
    if (søkparam.personIdent === '17058018783') {
        setTimeout(() => res.send(lesMockFil(`søk-2.json`)), 500);
    } else if (søkparam.personIdent === '28111883612') {
        setTimeout(() => res.send(lesMockFil(`søk-1.json`)), 500);
    } else {
        setTimeout(
            () =>
                res.send({
                    status: 'FEILET',
                    melding: 'Person ikke funnet',
                }),
            500
        );
    }
});

export default app;
