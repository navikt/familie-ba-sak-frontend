import { angreKorrigertVedtak } from '@api/angreKorrigertVedtak';
import { apiClient } from '@api/client/apiClient';
import { lagKorrigertVedtak } from '@testutils/testdata/korrigertVedtakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        patch: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 1;
const korrigertVedtak = lagKorrigertVedtak();

describe('angreKorrigertVedtak', () => {
    test('skal sende forespørsel om å angre korrigert vedtak', async () => {
        vi.mocked(apiClient.patch).mockResolvedValueOnce(korrigertVedtak);

        const svar = await angreKorrigertVedtak(behandlingId);

        expect(apiClient.patch).toHaveBeenCalledTimes(1);
        expect(apiClient.patch).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(korrigertVedtak);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.patch).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(angreKorrigertVedtak(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
