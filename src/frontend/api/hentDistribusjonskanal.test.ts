import { apiClient } from '@api/client/apiClient';
import { Distribusjonskanal } from '@typer/dokument';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentDistribusjonskanal } from './hentDistribusjonskanal';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentDistribusjonskanal', () => {
    test('kaller apiClient.post med riktig URL og ident', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(Distribusjonskanal.DITT_NAV);

        const result = await hentDistribusjonskanal('12345678903');

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/dokument/distribusjonskanal',
            data: { ident: '12345678903' },
        });
        expect(result).toBe(Distribusjonskanal.DITT_NAV);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentDistribusjonskanal('12345678903')).rejects.toThrow('Noe gikk galt');
    });
});
