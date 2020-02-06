const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const delayMs = 20;
const app = express();
app.use(bodyParser.json());

const lesMockFil = filnavn => {
    try {
        return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
    } catch (err) {
        throw err;
    }
};

app.get('/familie-ba-sak/api/fagsak/1', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.get('/user/profile', (req, res) => {
    res.send({
        displayName: 'Test Testersen',
    });
});

app.get('/familie-ba-sak/api/behandling/1/vedtak-html', (req, res) => {
    setTimeout(
        () =>
            res.send({
                data: lesMockFil(`vedtak.html`),
                status: 'SUKSESS',
            }),
        delayMs
    );
});

app.post('/familie-ba-sak/api/behandling/opprett', (req, res) => {
    setTimeout(
        () =>
            res.send({
                data: {
                    opprettetTidspunkt: Date.now(),
                    id: 1,
                    søkerFødselsnummer: req.body.fødselsnummer,
                    behandlinger: [
                        {
                            aktiv: true,
                            behandlingId: 1,
                            søker: req.body.fødselsnummer,
                            barnasFødselsnummer: req.body.barnasFødselsnummer,
                            vedtakForBehandling: [],
                        },
                    ],
                },
                status: 'SUKSESS',
            }),
        delayMs * 80
    );
});

app.post('/familie-ba-sak/api/fagsak/1/kort-vedtak', (req, res) => {
    setTimeout(
        () =>
            res.send({
                data: {
                    opprettetTidspunkt: Date.now(),
                    id: 1,
                    søkerFødselsnummer: req.body.fødselsnummer,
                    behandlinger: [
                        {
                            aktiv: true,
                            behandlingId: 1,
                            søker: req.body.fødselsnummer,
                            barnasFødselsnummer: req.body.barnasFødselsnummer,
                            vedtakForBehandling: [
                                {
                                    aktiv: true,
                                    ansvarligSaksbehandler: 'tester',
                                    vedtaksdato: Date.now(),
                                    barnasBeregning: [],
                                    resultat: req.body.resultat,
                                },
                            ],
                        },
                    ],
                },
                status: 'SUKSESS',
            }),
        delayMs * 80
    );
});

module.exports = app;
