import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

export function resolveToPromise<T>(ressurs: Ressurs<T>): Promise<Awaited<T>> {
    switch (ressurs.status) {
        case RessursStatus.IKKE_HENTET:
        case RessursStatus.HENTER:
            // Dette burde egentlig aldri skje da ressursen burde allerede være hentet på dette tidspunktet.
            return Promise.reject(new Error(`Uforventet ressurs status ${ressurs.status}.`));
        case RessursStatus.SUKSESS:
            return Promise.resolve(ressurs.data);
        case RessursStatus.IKKE_TILGANG:
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return Promise.reject(new Error(ressurs.frontendFeilmelding));
    }
}

export * as RessursResolver from './ressursResolver';
