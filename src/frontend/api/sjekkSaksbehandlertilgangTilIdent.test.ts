import { apiClient } from '@api/client/apiClient';
import { Adressebeskyttelsegradering } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { sjekkSaksbehandlertilgangTilIdent, type Tilgangsresultat } from './sjekkSaksbehandlertilgangTilIdent';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const tilgangsresultat: Tilgangsresultat = {
    saksbehandlerHarTilgang: true,
    adressebeskyttelsegradering: Adressebeskyttelsegradering.UGRADERT,
};

describe('sjekkSaksbehandlertilgangTilIdent', () => {
    test('skal sjekke tilgang til ident og returnere tilgangsresultatet', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockResolvedValueOnce(tilgangsresultat);

        // Act
        const svar = await sjekkSaksbehandlertilgangTilIdent({ brukerIdent: '12345678903' });

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/tilgang',
            data: { brukerIdent: '12345678903' },
        });
        expect(svar).toEqual(tilgangsresultat);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        // Arrange
        const feil = new Error('Kunne ikke sjekke tilgang');
        vi.mocked(apiClient.post).mockRejectedValueOnce(feil);

        // Act & assert
        await expect(sjekkSaksbehandlertilgangTilIdent({ brukerIdent: '12345678903' })).rejects.toBe(feil);
    });
});
