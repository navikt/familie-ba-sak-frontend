import { apiClient } from '@api/client/apiClient';
import { hentBehandling } from '@api/hentBehandling';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('hentBehandling', () => {
    test('skal hente behandlingen og returnere den', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(behandling);

        const svar = await hentBehandling({ behandlingId });

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Kunne ikke hente behandling');
        vi.mocked(apiClient.get).mockRejectedValueOnce(feil);

        await expect(hentBehandling({ behandlingId })).rejects.toBe(feil);
    });
});
