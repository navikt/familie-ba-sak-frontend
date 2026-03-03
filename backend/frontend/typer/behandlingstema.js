export var BehandlingKategori;
(function (BehandlingKategori) {
    BehandlingKategori["NASJONAL"] = "NASJONAL";
    BehandlingKategori["E\u00D8S"] = "E\u00D8S";
})(BehandlingKategori || (BehandlingKategori = {}));
export var BehandlingUnderkategori;
(function (BehandlingUnderkategori) {
    BehandlingUnderkategori["ORDIN\u00C6R"] = "ORDIN\u00C6R";
    BehandlingUnderkategori["UTVIDET"] = "UTVIDET";
})(BehandlingUnderkategori || (BehandlingUnderkategori = {}));
export var Behandlingstema;
(function (Behandlingstema) {
    Behandlingstema["NASJONAL_ORDIN\u00C6R"] = "NASJONAL_ORDIN\u00C6R";
    Behandlingstema["NASJONAL_UTVIDET"] = "NASJONAL_UTVIDET";
    Behandlingstema["NASJONAL_INSTITUSJON"] = "NASJONAL_INSTITUSJON";
    Behandlingstema["E\u00D8S_ORDIN\u00C6R"] = "E\u00D8S_ORDIN\u00C6R";
    Behandlingstema["E\u00D8S_UTVIDET"] = "E\u00D8S_UTVIDET";
})(Behandlingstema || (Behandlingstema = {}));
export const behandlingKategori = {
    NASJONAL: 'Nasjonal',
    EØS: 'EØS',
};
export const behandlingUnderkategori = {
    ORDINÆR: 'Ordinær',
    UTVIDET: 'Utvidet',
};
export const behandlingstemaer = {
    NASJONAL_ORDINÆR: {
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        navn: 'Nasjonal ordinær',
        id: 'NASJONAL_ORDINÆR',
    },
    NASJONAL_UTVIDET: {
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.UTVIDET,
        navn: 'Nasjonal utvidet',
        id: 'NASJONAL_UTVIDET',
    },
    NASJONAL_INSTITUSJON: {
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        navn: 'Nasjonal institusjon',
        id: 'NASJONAL_INSTITUSJON',
    },
    EØS_ORDINÆR: {
        kategori: BehandlingKategori.EØS,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        navn: 'EØS ordinær',
        id: 'EØS_ORDINÆR',
    },
    EØS_UTVIDET: {
        kategori: BehandlingKategori.EØS,
        underkategori: BehandlingUnderkategori.UTVIDET,
        navn: 'EØS utvidet',
        id: 'EØS_UTVIDET',
    },
};
export const tilBehandlingstema = (kategori, underkategori) => {
    return Object.values(behandlingstemaer).find((tema) => tema.kategori === kategori && tema.underkategori === underkategori);
};
export const kodeTilBehandlingUnderkategoriMap = {
    ab0180: BehandlingUnderkategori.ORDINÆR,
    ab0096: BehandlingUnderkategori.UTVIDET,
};
export const kodeTilBehandlingKategoriMap = {
    ae0118: BehandlingKategori.NASJONAL,
    ae0120: BehandlingKategori.EØS,
};
