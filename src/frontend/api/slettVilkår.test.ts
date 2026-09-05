import { apiClient } from '@api/client/apiClient';
import { slettVilkår } from '@api/slettVilkår';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { VilkårType } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload = { personIdent: '12345678910', vilkårType: VilkårType.UTVIDET_BARNETRYGD };

describe('slettVilkår', () => {
    test('skal sende DELETE-forespørsel med riktig URL og data', async () => {
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.delete).mockResolvedValueOnce(behandling);

        const svar = await slettVilkår(123, payload);

        expect(apiClient.delete).toHaveBeenCalledTimes(1);

        expect(apiClient.delete).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/vilkaarsvurdering/123/vilkaar',
            data: payload,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom apiClient.delete feiler', async () => {
        vi.mocked(apiClient.delete).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(slettVilkår(123, payload)).rejects.toThrow('Noe gikk galt');
    });
});
