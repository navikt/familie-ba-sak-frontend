import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

export const hentFrontendFeilmelding = <T>(ressurs: Ressurs<T>): string | undefined =>
    ressurs.status === RessursStatus.FEILET ||
    ressurs.status === RessursStatus.FUNKSJONELL_FEIL ||
    ressurs.status === RessursStatus.IKKE_TILGANG
        ? ressurs.frontendFeilmelding
        : undefined;
