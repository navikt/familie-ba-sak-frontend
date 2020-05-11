import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { vedtakHtml } from './mock/vedtak';
import { hentMockFagsak, oppdaterBehandlingsstatusPaaFagsak } from './mock/fagsak';
import { BehandlingStatus } from '../frontend/typer/behandling';
import { TotrinnskontrollBeslutning } from '../frontend/typer/totrinnskontroll';
import { Ressurs, RessursStatus } from '../frontend/typer/ressurs';
import { IFagsak } from '../frontend/typer/fagsak';

const delayMs = 20;
const app = express();
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

const lesMockFil = (filnavn: string) => {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
};

const byggOkFagsak = (res: Response, content: Ressurs<IFagsak>) => {
    setTimeout(() => res.send(content), delayMs);
};

const bygg404 = (res: Response) => {
    res.status(404).send('Not found');
};

app.get('/familie-ba-sak/api/fagsaker/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const fagsak = hentMockFagsak(id);
    if (fagsak !== null) {
        byggOkFagsak(res, fagsak);
    } else {
        bygg404(res);
    }
});

app.get('/familie-ba-sak/api/person', (_: Request, res: Response) => {
    setTimeout(() => res.status(200).send(lesMockFil(`person-1.json`)), delayMs);
});

app.get('/user/profile', (_: Request, res: Response) => {
    res.send({
        displayName: 'Test Testersen',
        enhet: '8888',
        navIdent: 'Z991144',
        groups: ['9449c153-5a1e-44a7-84c6-7cc7a8867233'],
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
    setTimeout(() => res.send(hentMockFagsak('1')), delayMs);
});

app.post('/familie-ba-sak/api/fagsaker/1/vedtak', (_: Request, res: Response) => {
    setTimeout(() => res.send(hentMockFagsak('1')), delayMs);
});

app.get('/familie-ba-sak/api/logg/2', (_: Request, res: Response) => {
    setTimeout(() => res.send(lesMockFil(`logg-2.json`)), delayMs);
});

app.get('/familie-ba-sak/api/vedtak/oversikt/2', (_: Request, res: Response) => {
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

app.post('/familie-ba-sak/api/fagsaker/:id/iverksett-vedtak', (req: Request, res: Response) => {
    const { id } = req.params;
    const fagsak = hentMockFagsak(id);
    if (fagsak !== null) {
        const nyStatus =
            req.body.beslutning === TotrinnskontrollBeslutning.UNDERKJENT
                ? BehandlingStatus.UNDERKJENT_AV_BESLUTTER
                : BehandlingStatus.GODKJENT;

        byggOkFagsak(res, oppdaterBehandlingsstatusPaaFagsak(fagsak, nyStatus));
    } else {
        bygg404(res);
    }
    setTimeout(() => res.send(), delayMs);
});

app.post('/familie-ba-sak/api/fagsaker/:id/send-til-beslutter', (req: Request, res: Response) => {
    const { id } = req.params;
    const fagsak = hentMockFagsak(id);
    if (fagsak !== null) {
        byggOkFagsak(
            res,
            oppdaterBehandlingsstatusPaaFagsak(fagsak, BehandlingStatus.SENDT_TIL_BESLUTTER)
        );
    } else {
        bygg404(res);
    }
});

app.post('/familie-ba-sak/api/oppgave/hent-oppgaver', (req, res) => {
    const { limit } = req.body;
    const lmt = parseInt(limit) || 0;
    const mockRess = JSON.parse(lesMockFil(`oppgaver.json`));
    setTimeout(
        () =>
            res.send({
                ...mockRess,
                data: {
                    antallTreffTotalt: mockRess.data.antallTreffTotalt,
                    oppgaver: mockRess.data.oppgaver.slice(
                        0,
                        Math.min(lmt, mockRess.data.oppgaver.length)
                    ),
                },
            }),
        500
    );
});

app.get('/familie-ba-sak/api/debug/error', (_, res) => {
    setTimeout(
        () =>
            res.send({
                status: RessursStatus.FEILET,
                melding: 'API feil (debug)',
            }),
        500
    );
});

app.post('/familie-ba-sak/api/oppgave/:id/fordel', (req: Request, res: Response) => {
    const { id } = req.params;
    setTimeout(() => res.send({ status: 'SUKSESS', data: id }), delayMs);
});

app.post('/familie-ba-sak/api/oppgave/:id/tilbakestill', (req: Request, res: Response) => {
    const { id } = req.params;
    setTimeout(() => res.send({ status: 'SUKSESS', data: id }), delayMs);
});

export default app;
