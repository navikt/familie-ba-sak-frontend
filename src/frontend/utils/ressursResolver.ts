import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

function resolveToPromise<T>(ressurs: Ressurs<T>): Promise<T> {
    switch (ressurs.status) {
        case RessursStatus.IKKE_HENTET:
        case RessursStatus.HENTER:
            return Promise.reject(`Uforventet response status: ${ressurs.status}`);
        case RessursStatus.SUKSESS:
            return Promise.resolve(ressurs.data);
        case RessursStatus.IKKE_TILGANG:
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return Promise.reject(ressurs.frontendFeilmelding);
    }
}

export const RessursResolver = { resolveToPromise };
