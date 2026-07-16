import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { validerBehandlingsresultat } from './validerBehandlingsresultat';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { get: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('validerBehandlingsresultat', () => {
    test('kaller GET med riktig URL, og får forventet resultat', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue(true);

        // Act
        const result = await validerBehandlingsresultat(123);

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/123/steg/behandlingsresultat/valider`,
        });
        expect(result).toBe(true);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(validerBehandlingsresultat(123)).rejects.toThrow();
    });
});
