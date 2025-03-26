import type { IJournalpost } from '@navikt/familie-typer';

export interface ITilgangsstyrtJournalpost {
    journalpost: IJournalpost;
    journalpostTilgang: IJournalpostTilgang;
}

export interface IJournalpostTilgang {
    harTilgang: boolean;
    begrunnelse: string;
}
