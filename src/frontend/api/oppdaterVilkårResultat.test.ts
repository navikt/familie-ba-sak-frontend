import { apiClient } from '@api/client/apiClient';
import { oppdaterVilkårResultat } from '@api/oppdaterVilkårResultat';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import type { IRestPersonResultat } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const personResultat: IRestPersonResultat = { personIdent: '12345678910', vilkårResultater: [], andreVurderinger: [] };

describe('oppdaterVilkårResultat', () => {
    test('skal sende PUT-forespørsel med riktig URL og personresultat som data', async () => {
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await oppdaterVilkårResultat({ behandlingId: 123, vilkårResultatId: 7 }, personResultat);

        expect(apiClient.put).toHaveBeenCalledTimes(1);

        expect(apiClient.put).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/vilkaarsvurdering/123/7',
            data: personResultat,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom apiClient.put feiler', async () => {
        vi.mocked(apiClient.put).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(
            oppdaterVilkårResultat({ behandlingId: 123, vilkårResultatId: 7 }, personResultat)
        ).rejects.toThrow('Noe gikk galt');
    });
});
