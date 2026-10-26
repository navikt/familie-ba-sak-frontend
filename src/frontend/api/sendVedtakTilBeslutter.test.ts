import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { sendVedtakTilBeslutter } from './sendVedtakTilBeslutter';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('sendVedtakTilBeslutter', () => {
    test('kaller POST med riktig URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        vi.mocked(apiClient.post).mockResolvedValue(behandling);

        const parameters = {
            behandlingId: behandling.behandlingId,
            behandlendeEnhet: '4820',
        };

        // Act
        const result = await sendVedtakTilBeslutter(parameters);

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${parameters.behandlingId}/steg/send-til-beslutter?behandlendeEnhet=${parameters.behandlendeEnhet}`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        const parameters = {
            behandlingId: 123,
            behandlendeEnhet: '4820',
        };

        // Act & assert
        await expect(sendVedtakTilBeslutter(parameters)).rejects.toThrow('Noe gikk galt');
    });
});
