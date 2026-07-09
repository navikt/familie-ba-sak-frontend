import { apiClient } from '@api/client/apiClient';
import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

describe('slettVilkårResultat', () => {
    test('skal sende DELETE-forespørsel med riktig URL og personIdent som data', async () => {
        const behandling = lagBehandling({ behandlingId: 123 });

        const pathParams = {
            behandlingId: behandling.behandlingId,
            vilkårResultatId: 456,
        };

        const payload = {
            personIdent: '12345678910',
        };

        vi.mocked(apiClient.delete).mockResolvedValueOnce(behandling);

        const svar = await slettVilkårResultat(pathParams, payload);

        expect(apiClient.delete).toHaveBeenCalledTimes(1);
        expect(apiClient.delete).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/vilkaarsvurdering/${pathParams.behandlingId}/${pathParams.vilkårResultatId}`,
            data: payload.personIdent,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom apiClient.delete feiler', async () => {
        const pathParams = {
            behandlingId: 1,
            vilkårResultatId: 2,
        };

        const payload = {
            personIdent: '00000000000',
        };

        vi.mocked(apiClient.delete).mockRejectedValueOnce(new Error('Noe gikk feil'));

        await expect(slettVilkårResultat(pathParams, payload)).rejects.toThrow('Noe gikk feil');
    });
});
