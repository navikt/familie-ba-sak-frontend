export declare enum BehandlingKategori {
    NASJONAL = "NASJONAL",
    EØS = "E\u00D8S"
}
export declare enum BehandlingUnderkategori {
    ORDINÆR = "ORDIN\u00C6R",
    UTVIDET = "UTVIDET"
}
export declare enum Behandlingstema {
    NASJONAL_ORDINÆR = "NASJONAL_ORDIN\u00C6R",
    NASJONAL_UTVIDET = "NASJONAL_UTVIDET",
    NASJONAL_INSTITUSJON = "NASJONAL_INSTITUSJON",
    EØS_ORDINÆR = "E\u00D8S_ORDIN\u00C6R",
    EØS_UTVIDET = "E\u00D8S_UTVIDET"
}
export interface IRestEndreBehandlingUnderkategori {
    behandlingKategori: BehandlingKategori;
    behandlingUnderkategori: BehandlingUnderkategori;
}
export declare const behandlingKategori: Record<BehandlingKategori, string>;
export declare const behandlingUnderkategori: Record<BehandlingUnderkategori, string>;
export interface IBehandlingstema {
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
    navn: string;
    id: string;
}
export declare const behandlingstemaer: Record<Behandlingstema, IBehandlingstema>;
export declare const tilBehandlingstema: (kategori: BehandlingKategori, underkategori: BehandlingUnderkategori) => IBehandlingstema | undefined;
export declare const kodeTilBehandlingUnderkategoriMap: Record<string, BehandlingUnderkategori>;
export declare const kodeTilBehandlingKategoriMap: Record<string, BehandlingKategori>;
