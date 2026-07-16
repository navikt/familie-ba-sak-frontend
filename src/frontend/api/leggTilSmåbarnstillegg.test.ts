import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { leggTilSmåbarnstillegg, type Småbarnstilleggkorrigering } from './leggTilSmåbarnstillegg';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('leggTilSmåbarnstillegg', () => {
    const payload: Småbarnstilleggkorrigering = { årMåned: '2025-01' };

    test('kaller POST med riktig data og URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.post).mockResolvedValue(behandling);

        // Act
        const result = await leggTilSmåbarnstillegg(payload, behandling.behandlingId);

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/småbarnstilleggkorrigering/behandling/${behandling.behandlingId}`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(leggTilSmåbarnstillegg(payload, 123)).rejects.toThrow();
    });
});
