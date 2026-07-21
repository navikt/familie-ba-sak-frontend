import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentPersonerMedUgyldigEtterbetalingsperiode } from './hentPersonerMedUgyldigEtterbetalingsperiode';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { get: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentPersonerMedUgyldigEtterbetalingsperiode', () => {
    test('kaller GET med riktig URL, og får forventet resultat', async () => {
        // Arrange
        const personer = ['12345678901', '10987654321'];
        vi.mocked(apiClient.get).mockResolvedValue(personer);

        // Act
        const result = await hentPersonerMedUgyldigEtterbetalingsperiode(123);

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/123/personer-med-ugyldig-etterbetalingsperiode`,
        });
        expect(result).toEqual(personer);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(hentPersonerMedUgyldigEtterbetalingsperiode(123)).rejects.toThrow();
    });
});
