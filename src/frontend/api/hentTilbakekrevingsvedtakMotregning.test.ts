import { apiClient } from '@api/client/apiClient';
import { hentTilbakekrevingsvedtakMotregning } from '@api/hentTilbakekrevingsvedtakMotregning';
import { lagTilbakekrevingsvedtakMotregning } from '@testutils/testdata/tilbakekrevingsvedtakMotregningTestdata';
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

const tilbakekrevingsvedtakMotregning = lagTilbakekrevingsvedtakMotregning();

describe('hentTilbakekrevingsvedtakMotregning', () => {
    test('skal hente tilbakekrevingsvedtak motregning for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(tilbakekrevingsvedtakMotregning);

        const svar = await hentTilbakekrevingsvedtakMotregning(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning`,
        });
        expect(svar).toEqual(tilbakekrevingsvedtakMotregning);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentTilbakekrevingsvedtakMotregning(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
