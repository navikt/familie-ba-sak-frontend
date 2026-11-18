import { apiClient } from '@api/client/apiClient';
import { oppdaterValutakursPåBehandling } from '@api/oppdaterValutakursPåBehandling';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('oppdaterValutakursPåBehandling', () => {
    test('skal oppdatere valutakurs og returnere behandlingen', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await oppdaterValutakursPåBehandling({ behandlingId });

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/oppdatert-valutakurs`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Kunne ikke oppdatere valutakurs');
        vi.mocked(apiClient.put).mockRejectedValueOnce(feil);

        await expect(oppdaterValutakursPåBehandling({ behandlingId })).rejects.toBe(feil);
    });
});
