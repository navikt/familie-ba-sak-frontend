import { apiClient } from '@api/client/apiClient';
import { opprettEndretUtbetalingAndel } from '@api/opprettEndretUtbetalingAndel';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

describe('opprettEndretUtbetalingAndel', () => {
    test('skal sende POST til riktig URL og returnere behandlingen', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        // Act
        const svar = await opprettEndretUtbetalingAndel(behandling.behandlingId);

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/endretutbetalingandel/123',
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('Noe gikk galt'));

        // Act & assert
        await expect(opprettEndretUtbetalingAndel(behandling.behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
