import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { taBehandlingAvVent } from './taBehandlingAvVent';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { put: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('taBehandlingAvVent', () => {
    test('kaller PUT med riktig URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.put).mockResolvedValue(behandling);

        // Act
        const result = await taBehandlingAvVent(behandling.behandlingId);

        // Assert
        expect(apiClient.put).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}/fortsettbehandling`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(taBehandlingAvVent(123)).rejects.toThrow();
    });
});
