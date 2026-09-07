import { angreKorrigertEtterbetaling } from '@api/angreKorrigertEtterbetaling';
import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        patch: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('angreKorrigertEtterbetaling', () => {
    test('skal sende forespørsel om å angre korrigert etterbetaling', async () => {
        vi.mocked(apiClient.patch).mockResolvedValueOnce(behandling);

        const svar = await angreKorrigertEtterbetaling(behandlingId);

        expect(apiClient.patch).toHaveBeenCalledTimes(1);
        expect(apiClient.patch).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.patch).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(angreKorrigertEtterbetaling(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
