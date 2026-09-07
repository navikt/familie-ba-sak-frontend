import { apiClient } from '@api/client/apiClient';
import { oppdaterAnnenVurdering } from '@api/oppdaterAnnenVurdering';
import { lagAnnenVurdering } from '@testutils/testdata/annenVurderingTestdata';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { Resultat } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const annenVurdering = lagAnnenVurdering({ id: 5, behandlingId: 123, resultat: Resultat.OPPFYLT });

describe('oppdaterAnnenVurdering', () => {
    test('skal sende PUT-forespørsel med riktig URL og data', async () => {
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await oppdaterAnnenVurdering({ behandlingId: 123, annenVurderingId: 5 }, annenVurdering);

        expect(apiClient.put).toHaveBeenCalledTimes(1);

        expect(apiClient.put).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/vilkaarsvurdering/123/annenvurdering/5',
            data: annenVurdering,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom apiClient.put feiler', async () => {
        vi.mocked(apiClient.put).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(
            oppdaterAnnenVurdering({ behandlingId: 123, annenVurderingId: 5 }, annenVurdering)
        ).rejects.toThrow('Noe gikk galt');
    });
});
