import { angreKorrigertEtterbetaling } from '@api/angreKorrigertEtterbetaling';
import { apiClient } from '@api/client/apiClient';
import { lagKorrigertEtterbetaling } from '@testutils/testdata/korrigertEtterbetalingTestdata';
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
const korrigertEtterbetaling = lagKorrigertEtterbetaling();

describe('angreKorrigertEtterbetaling', () => {
    test('skal sende forespørsel om å angre korrigert etterbetaling', async () => {
        vi.mocked(apiClient.patch).mockResolvedValueOnce(korrigertEtterbetaling);

        const svar = await angreKorrigertEtterbetaling(behandlingId);

        expect(apiClient.patch).toHaveBeenCalledTimes(1);
        expect(apiClient.patch).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(korrigertEtterbetaling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.patch).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(angreKorrigertEtterbetaling(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
