import { apiClient } from '@api/client/apiClient';
import { hentKorrigertEtterbetaling } from '@api/hentKorrigertEtterbetaling';
import { lagKorrigertEtterbetaling } from '@testutils/testdata/korrigertEtterbetalingTestdata';
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

const korrigertEtterbetaling = lagKorrigertEtterbetaling();

describe('hentKorrigertEtterbetaling', () => {
    test('skal hente korrigert etterbetaling for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(korrigertEtterbetaling);

        const svar = await hentKorrigertEtterbetaling(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(korrigertEtterbetaling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentKorrigertEtterbetaling(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
