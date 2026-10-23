import { apiClient } from '@api/client/apiClient';
import { registrerInstitusjon } from '@api/registrerInstitusjon';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

describe('registrerInstitusjon', () => {
    test('skal sende forespørsel uten body', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        // Act
        const svar = await registrerInstitusjon({ behandlingId: behandling.behandlingId });

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/registrer-institusjon`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & Assert
        await expect(registrerInstitusjon({ behandlingId: behandling.behandlingId })).rejects.toThrow('Noe gikk galt');
    });
});
