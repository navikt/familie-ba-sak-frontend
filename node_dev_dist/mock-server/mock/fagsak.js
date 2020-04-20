"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ressurs_1 = require("../../frontend/typer/ressurs");
const ts_auto_mock_1 = require("ts-auto-mock");
exports.mockFagsak = (id, søkerFødselsnummer) => {
    const fagsak = ts_auto_mock_1.createMock();
    fagsak.id = id;
    fagsak.søkerFødselsnummer = søkerFødselsnummer;
    fagsak.behandlinger = [];
    return ressurs_1.byggSuksessRessurs(fagsak);
};
exports.mockBehandling = (behandlingId, aktiv, steg) => {
    const behandling = ts_auto_mock_1.createMock();
    behandling.behandlingId = behandlingId;
    behandling.aktiv = aktiv;
    behandling.steg = steg;
    behandling.personer = [];
    return behandling;
};
//# sourceMappingURL=fagsak.js.map