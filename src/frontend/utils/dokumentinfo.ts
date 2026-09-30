import type { IDokumentInfo } from '@navikt/familie-typer';

import type { IRestJournalpostDokument } from '@typer/manuell-journalføring';

export function lagJournalpostDokumenterForJournalføring(dokumenter: IDokumentInfo[]): IRestJournalpostDokument[] {
    return dokumenter.map(dokument => ({
        dokumentTittel: dokument.tittel,
        dokumentInfoId: dokument.dokumentInfoId || '0',
        logiskeVedlegg: dokument.logiskeVedlegg,
    }));
}
