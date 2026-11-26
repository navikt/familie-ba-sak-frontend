import { apiClient } from '@api/client/apiClient';
import { oppdaterBehandlingsresultat } from '@api/oppdaterBehandlingsresultat';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('oppdaterBehandlingsresultat', () => {
    test('skal sende POST til behandlingsresultat-steget og returnere behandlingen', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.post).mockResolvedValue(behandling);

        // Act
        const svar = await oppdaterBehandlingsresultat(123);

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/behandlinger/123/steg/behandlingsresultat',
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(oppdaterBehandlingsresultat(123)).rejects.toThrow('Noe gikk galt');
    });
});
