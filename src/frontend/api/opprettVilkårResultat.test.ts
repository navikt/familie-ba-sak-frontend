import { apiClient } from '@api/client/apiClient';
import { opprettVilkårResultat } from '@api/opprettVilkårResultat';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { VilkårType } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload = { personIdent: '12345678910', vilkårType: VilkårType.BOR_MED_SØKER };

describe('opprettVilkårResultat', () => {
    test('skal sende POST-forespørsel med riktig URL og data', async () => {
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await opprettVilkårResultat(123, payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/vilkaarsvurdering/123',
            data: payload,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom apiClient.post feiler', async () => {
        vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(opprettVilkårResultat(123, payload)).rejects.toThrow('Noe gikk galt');
    });
});
