import { apiClient } from '@api/client/apiClient';
import { hentTilbakekreving } from '@api/hentTilbakekreving';
import { lagTilbakekreving } from '@testutils/testdata/tilbakekrevingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 1;

const tilbakekreving = lagTilbakekreving();

describe('hentTilbakekreving', () => {
    test('skal hente tilbakekreving for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(tilbakekreving);

        const svar = await hentTilbakekreving(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/tilbakekreving/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(tilbakekreving);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentTilbakekreving(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
