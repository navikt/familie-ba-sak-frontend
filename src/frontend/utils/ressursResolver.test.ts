import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { RessursResolver } from './ressursResolver';
import { ApiError } from '../api/error/apiError';

describe('RessursResolver', () => {
    test('skal kaste error hvis man prøver å resolve HENTER ressurs', () => {
        // Arrange
        const henterRessurs: Ressurs<void> = {
            status: RessursStatus.HENTER,
        };

        // Act & expect
        RessursResolver.resolveToPromise(henterRessurs).catch((error: ApiError) => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error.message).toBe(`Uforventet status ${henterRessurs.status}.`);
            expect(error.type).toBe(ApiError.Type.HENTER);
        });
    });

    test('skal kaste error hvis man prøver å resolve IKKE_HENTET ressurs', () => {
        // Arrange
        const ikkeHentetRessurs: Ressurs<void> = {
            status: RessursStatus.IKKE_HENTET,
        };

        // Act & expect
        RessursResolver.resolveToPromise(ikkeHentetRessurs).catch((error: ApiError) => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error.message).toBe(`Uforventet status ${ikkeHentetRessurs.status}.`);
            expect(error.type).toBe(ApiError.Type.IKKE_HENTET);
        });
    });

    test('skal resolve suksess ressurs til promise', () => {
        // Arrange
        const suksessRessurs: Ressurs<string> = {
            status: RessursStatus.SUKSESS,
            data: 'bla bla bla',
        };

        // Act
        const promise = RessursResolver.resolveToPromise(suksessRessurs);

        // Expect
        promise.then(data => expect(data).toBe('bla bla bla'));
    });

    test('skal kaste error hvis man prøver å resolve IKKE_TILGANG ressurs', () => {
        // Arrange
        const ikkeTilgangRessurs: Ressurs<void> = {
            status: RessursStatus.IKKE_TILGANG,
            frontendFeilmelding: 'Du har ikke tilgang.',
        };

        // Act & expect
        RessursResolver.resolveToPromise(ikkeTilgangRessurs).catch((error: ApiError) => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error.message).toBe('Du har ikke tilgang.');
            expect(error.type).toBe(ApiError.Type.IKKE_TILGANG);
        });
    });

    test('skal kaste error hvis man prøver å resolve FEILET ressurs', () => {
        // Arrange
        const feiletRessurs: Ressurs<void> = {
            status: RessursStatus.FEILET,
            frontendFeilmelding: 'Ops! En feil oppstod.',
        };

        // Act & expect
        RessursResolver.resolveToPromise(feiletRessurs).catch((error: ApiError) => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error.message).toBe('Ops! En feil oppstod.');
            expect(error.type).toBe(ApiError.Type.FEILET);
        });
    });

    test('skal kaste error hvis man prøver å resolve FUNKSJONELL_FEIL ressurs', () => {
        // Arrange
        const funksjonellFeilRessurs: Ressurs<void> = {
            status: RessursStatus.FUNKSJONELL_FEIL,
            frontendFeilmelding: 'Ops! En funksjonell feil oppstod.',
        };

        // Act & expect
        RessursResolver.resolveToPromise(funksjonellFeilRessurs).catch((error: ApiError) => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error.message).toBe('Ops! En funksjonell feil oppstod.');
            expect(error.type).toBe(ApiError.Type.FUNKSJONELL_FEIL);
        });
    });
});
