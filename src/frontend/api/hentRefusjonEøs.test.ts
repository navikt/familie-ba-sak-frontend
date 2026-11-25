import { apiClient } from '@api/client/apiClient';
import { hentRefusjonEøs } from '@api/hentRefusjonEøs';
import { lagRefusjonEøs } from '@testutils/testdata/refusjonEøsTestdata';
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

const refusjonEøsPerioder = [lagRefusjonEøs()];

describe('hentRefusjonEøs', () => {
    test('skal hente refusjon EØS for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(refusjonEøsPerioder);

        const svar = await hentRefusjonEøs(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}`,
        });
        expect(svar).toEqual(refusjonEøsPerioder);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentRefusjonEøs(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
