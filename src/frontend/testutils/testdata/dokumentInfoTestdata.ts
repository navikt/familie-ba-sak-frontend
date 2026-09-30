import type { IDokumentInfo } from '@navikt/familie-typer';

export function lagDokumentInfo(dokumentInfo: Partial<IDokumentInfo> = {}): IDokumentInfo {
    return {
        dokumentInfoId: '1',
        tittel: 'Klage',
        brevkode: 'NAV 90-00.08 K',
        logiskeVedlegg: [],
        ...dokumentInfo,
    };
}

export * as DokumentInfoTestdata from './dokumentInfoTestdata';
