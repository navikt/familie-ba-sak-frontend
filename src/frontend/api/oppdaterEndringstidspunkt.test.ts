import { apiClient } from '@api/client/apiClient';
import { oppdaterEndringstidspunkt } from '@api/oppdaterEndringstidspunkt';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { put: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('oppdaterEndringstidspunkt', () => {
    test('skal sende PUT med endringstidspunkt og behandlingId og returnere behandlingen', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.put).mockResolvedValue(behandling);

        // Act
        const svar = await oppdaterEndringstidspunkt('2024-01-01', 123);

        // Assert
        expect(apiClient.put).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/vedtaksperioder/endringstidspunkt',
            data: {
                overstyrtEndringstidspunkt: '2024-01-01',
                behandlingId: 123,
            },
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(oppdaterEndringstidspunkt('2024-01-01', 123)).rejects.toThrow('Noe gikk galt');
    });
});
