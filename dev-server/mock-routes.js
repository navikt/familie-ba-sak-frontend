const express = require('express');
const path = require('path');
const fs = require('fs');

const delayMs = 20;
const app = express();

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

app.get('/familie-ba-sak/api/person', (req, res) => {
    setTimeout(
        () =>
            res.send({
                fødselsdato: '2001-02-20',
                kjønn: 'KVINNE',
                navn: 'Mor Moresen',
                personIdent: '12345678910',
                type: 'SØKER',
            }),
        delayMs
    );
});

app.get('/user/profile', (req, res) => {
    res.send({
        displayName: 'Test Testersen',
        enhet: '8888',
    });
});

app.get('/familie-ba-sak/api/behandling/2/vedtak-html', (req, res) => {
    setTimeout(
        () =>
            res.send({
                data: lesMockFil(`vedtak.html`),
                status: 'SUKSESS',
            }),
        delayMs
    );
});

app.post('/familie-ba-sak/api/behandling/ny-behandling', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.post('/familie-ba-sak/api/fagsak/1/nytt-vedtak', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

module.exports = app;
