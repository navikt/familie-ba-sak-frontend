import type { IJournalpost } from '@navikt/familie-typer';

export interface JournalpostMedTilgang {
    journalpost: IJournalpost;
    harTilgang: boolean;
}
