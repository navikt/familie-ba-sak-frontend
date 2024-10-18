import type { IJournalpost } from '@navikt/familie-typer';

export interface ITilgangsstyrtJournalpost {
    journalpost: IJournalpost;
    harTilgang: boolean;
}
