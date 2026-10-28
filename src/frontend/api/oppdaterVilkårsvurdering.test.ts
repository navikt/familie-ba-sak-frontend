import { apiClient } from '@api/client/apiClient';
import { oppdaterVilkårsvurdering } from '@api/oppdaterVilkårsvurdering';
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

describe('oppdaterVilkårsvurdering', () => {
    test('skal sende POST-forespørsel til vilkårsvurdering-steget og returnere behandlingen', async () => {
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await oppdaterVilkårsvurdering(behandling.behandlingId);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/vilkårsvurdering`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(apiClient.post).mockRejectedValueOnce(feil);

        await expect(oppdaterVilkårsvurdering(123)).rejects.toBe(feil);
    });
});
