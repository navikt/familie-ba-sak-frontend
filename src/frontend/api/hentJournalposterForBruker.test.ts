import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentJournalposterForBruker } from './hentJournalposterForBruker';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentJournalposterForBruker', () => {
    test('kaller apiClient.post med riktig URL og ident', async () => {
        vi.mocked(apiClient.post).mockResolvedValue([]);

        const result = await hentJournalposterForBruker('12345678903');

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/journalpost/for-bruker',
            data: { ident: '12345678903' },
        });
        expect(result).toEqual([]);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentJournalposterForBruker('12345678903')).rejects.toThrow('Noe gikk galt');
    });
});
