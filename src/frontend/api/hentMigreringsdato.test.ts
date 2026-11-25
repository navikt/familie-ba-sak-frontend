import { apiClient } from '@api/client/apiClient';
import { hentMigreringsdato } from '@api/hentMigreringsdato';
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

describe('hentMigreringsdato', () => {
    test('skal hente migreringsdato for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce('2020-02-01');

        const svar = await hentMigreringsdato(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/migreringsdato`,
        });
        expect(svar).toEqual('2020-02-01');
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentMigreringsdato(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
