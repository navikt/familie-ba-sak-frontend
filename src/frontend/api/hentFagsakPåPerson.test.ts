import { apiClient } from '@api/client/apiClient';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentFagsakPåPerson } from './hentFagsakPåPerson';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentFagsakPåPerson', () => {
    test('kaller apiClient.post med riktig URL og payload', async () => {
        const payload = { personIdent: '12345678910' };
        const fagsak = lagFagsak();
        vi.mocked(apiClient.post).mockResolvedValue(fagsak);

        const result = await hentFagsakPåPerson(payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/fagsaker/hent-fagsak-paa-person',
            data: payload,
        });
        expect(result).toBe(fagsak);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentFagsakPåPerson({ personIdent: '12345678910' })).rejects.toThrow('Noe gikk galt');
    });
});
