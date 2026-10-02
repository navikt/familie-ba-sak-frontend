import { apiClient } from '@api/client/apiClient';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentFagsaker } from './hentFagsaker';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentFagsaker', () => {
    test('kaller apiClient.post med riktig URL og payload', async () => {
        const payload = { personIdent: '12345678910' };
        const fagsaker = [lagFagsak()];
        vi.mocked(apiClient.post).mockResolvedValue(fagsaker);

        const result = await hentFagsaker(payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person',
            data: payload,
        });
        expect(result).toBe(fagsaker);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentFagsaker({ personIdent: '12345678910' })).rejects.toThrow('Noe gikk galt');
    });
});
