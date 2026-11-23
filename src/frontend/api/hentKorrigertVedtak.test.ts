import { apiClient } from '@api/client/apiClient';
import { hentKorrigertVedtak } from '@api/hentKorrigertVedtak';
import { lagKorrigertVedtak } from '@testutils/testdata/korrigertVedtakTestdata';
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

const korrigertVedtak = lagKorrigertVedtak();

describe('hentKorrigertVedtak', () => {
    test('skal hente korrigert vedtak for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(korrigertVedtak);

        const svar = await hentKorrigertVedtak(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(korrigertVedtak);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentKorrigertVedtak(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
