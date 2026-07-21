import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { fjernSmåbarnstillegg } from './fjernSmåbarnstillegg';
import type { Småbarnstilleggkorrigering } from './leggTilSmåbarnstillegg';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { delete: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('fjernSmåbarnstillegg', () => {
    const payload: Småbarnstilleggkorrigering = { årMåned: '2025-01' };

    test('kaller DELETE med riktig data og URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.delete).mockResolvedValue(behandling);

        // Act
        const result = await fjernSmåbarnstillegg(payload, behandling.behandlingId);

        // Assert
        expect(apiClient.delete).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/småbarnstilleggkorrigering/behandling/${behandling.behandlingId}`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.delete).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(fjernSmåbarnstillegg(payload, 123)).rejects.toThrow();
    });
});
