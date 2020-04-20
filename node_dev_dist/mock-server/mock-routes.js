"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const delayMs = 20;
const app = express_1.default();
app.use(express_1.default.json({ limit: '200mb' }));
app.use(express_1.default.urlencoded({ limit: '200mb', extended: true }));
const lesMockFil = (filnavn) => {
    try {
        return fs_1.default.readFileSync(path_1.default.join(__dirname, '/mock/' + filnavn), 'UTF-8');
    }
    catch (err) {
        throw err;
    }
};
app.get('/familie-ba-sak/api/fagsaker/:id', (req, res) => {
    const { id } = req.params;
    setTimeout(() => res.send(lesMockFil(`fagsak-${id}.json`)), delayMs);
});
app.get('/familie-ba-sak/api/person', (_, res) => {
    setTimeout(() => res.status(200).send(lesMockFil(`person-1.json`)), delayMs);
});
app.get('/user/profile', (_, res) => {
    res.send({
        displayName: 'Test Testersen',
        enhet: '8888',
    });
});
app.get('/familie-ba-sak/api/dokument/vedtak-html/3', (_, res) => {
    setTimeout(() => res.send({
        data: lesMockFil(`vedtak.html`),
        status: 'SUKSESS',
    }), delayMs);
});
app.post('/familie-ba-sak/api/behandlinger', (_, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});
app.post('/familie-ba-sak/api/fagsaker/1/vedtak', (_, res) => {
    setTimeout(() => res.send(lesMockFil(`fagsak-1.json`)), delayMs);
});
app.get('/familie-ba-sak/api/logg/2', (_, res) => {
    setTimeout(() => res.send(lesMockFil(`logg-2.json`)), delayMs);
});
app.get('/familie-ba-sak/api/vedtak/oversikt/2', (_, res) => {
    console.log('Truffet mock-endepunkt for beregning-oversikt');
    setTimeout(() => res.send(lesMockFil(`beregning-oversikt-1.json`)), delayMs);
});
app.post('/familie-ba-sak/api/fagsaker/sok', (req, res) => {
    const søkparam = req.body;
    if (søkparam.personIdent === '17058018783') {
        setTimeout(() => res.send(lesMockFil(`søk-2.json`)), 500);
    }
    else if (søkparam.personIdent === '28111883612') {
        setTimeout(() => res.send(lesMockFil(`søk-1.json`)), 500);
    }
    else {
        setTimeout(() => res.send({
            status: 'FEILET',
            melding: 'Person ikke funnet',
        }), 500);
    }
});
exports.default = app;
//# sourceMappingURL=mock-routes.js.map