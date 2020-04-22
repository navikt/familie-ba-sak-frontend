const express = require('express');
const path = require('path');
const fs = require('fs');

const delayMs = 20;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const lesMockFil = filnavn => {
    try {
        return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
    } catch (err) {
        throw err;
    }
};

app.get('/familie-ba-sak/api/fagsaker/:id', (req, res) => {
    const { id } = req.params;
    setTimeout(() => res.send(lesMockFil(`fagsak-${id}.json`)), delayMs);
});

app.get('/familie-ba-sak/api/person', (req, res) => {
    setTimeout(() => res.status(200).send(lesMockFil(`person-1.json`)), delayMs);
});

app.get('/user/profile', (req, res) => {
    res.send({
        displayName: 'Test Testersen',
        enhet: '8888',
        navIdent: 'Z991144',
    });
});

app.get('/familie-ba-sak/api/dokument/vedtak-html/3', (req, res) => {
    setTimeout(
        () =>
            res.send({
                data: lesMockFil(`vedtak.html`),
                status: 'SUKSESS',
            }),
        delayMs
    );
});

app.post('/familie-ba-sak/api/behandlinger', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.post('/familie-ba-sak/api/fagsaker/1/vedtak', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.put('/familie-ba-sak/api/fagsaker/1/vedtak', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});

app.get('/familie-ba-sak/api/logg/2', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`logg-2.json`)), delayMs);
});

app.get('/familie-ba-sak/api/vedtak/oversikt/2', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`beregning-oversikt-1.json`)), delayMs);
});

app.post('/familie-ba-sak/api/fagsaker/sok', (req, res) => {
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

app.get('/familie-ba-sak/api/oppgave', (req, res) => {
    setTimeout(() => res.send(lesMockFil(`oppgaver.json`)), 500);
});

module.exports = app;
