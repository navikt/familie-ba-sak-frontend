import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import type { IOppgave } from './oppgave';
import type { ITilbakekrevingsbehandling } from './tilbakekrevingsbehandling';

export enum BehandlingKategori {
    NASJONAL = 'NASJONAL',
    EØS = 'EØS',
}

export enum BehandlingUnderkategori {
    ORDINÆR = 'ORDINÆR',
    UTVIDET = 'UTVIDET',
}

export enum Behandlingstema {
    NASJONAL_ORDINÆR = 'NASJONAL_ORDINÆR',
    NASJONAL_UTVIDET = 'NASJONAL_UTVIDET',
    EØS_ORDINÆR = 'EØS_ORDINÆR',
    EØS_UTVIDET = 'EØS_UTVIDET',
}

export interface IRestEndreBehandlingUnderkategori {
    behandlingKategori: BehandlingKategori;
    behandlingUnderkategori: BehandlingUnderkategori;
}
export const behandlingKategori: Record<BehandlingKategori, string> = {
    NASJONAL: 'Nasjonal',
    EØS: 'EØS',
};
export const behandlingUnderkategori: Record<BehandlingUnderkategori, string> = {
    ORDINÆR: 'Ordinær',
    UTVIDET: 'Utvidet',
};

export interface IBehandlingstema {
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
    navn: string;
    id: string;
}

export const behandlingstemaer: Record<Behandlingstema, IBehandlingstema> = {
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

export const tilBehandlingstema = (
    kategori: BehandlingKategori,
    underkategori: BehandlingUnderkategori
): IBehandlingstema | undefined => {
    return Object.values(behandlingstemaer).find(
        (tema: IBehandlingstema) =>
            tema.kategori === kategori && tema.underkategori === underkategori
    );
};

export const kodeTilBehandlingUnderkategoriMap: Record<string, BehandlingUnderkategori> = {
    ab0180: BehandlingUnderkategori.ORDINÆR,
    ab0096: BehandlingUnderkategori.UTVIDET,
};

export const kodeTilBehandlingKategoriMap: Record<string, BehandlingKategori> = {
    ae0118: BehandlingKategori.NASJONAL,
    ae0120: BehandlingKategori.EØS,
};

export const utredBehandlingstemaFraOppgave = (oppgave: IOppgave): IBehandlingstema | undefined => {
    const { behandlingstema: gjelder, behandlingstype } = oppgave;
    return gjelder in kodeTilBehandlingUnderkategoriMap &&
        behandlingstype in kodeTilBehandlingKategoriMap
        ? tilBehandlingstema(
              kodeTilBehandlingKategoriMap[behandlingstype],
              kodeTilBehandlingUnderkategoriMap[gjelder]
          )
        : undefined;
};

export const hentKategorierHvisVisningBehandling = (
    behandling?: VisningBehandling | ITilbakekrevingsbehandling
) => {
    const kategori: BehandlingKategori | undefined = (behandling as VisningBehandling)?.kategori;
    const underkategori: BehandlingUnderkategori | undefined = (behandling as VisningBehandling)
        ?.underkategori;

    return kategori && underkategori ? { kategori, underkategori } : undefined;
};
