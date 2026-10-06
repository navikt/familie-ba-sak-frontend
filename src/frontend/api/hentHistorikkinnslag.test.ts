import { apiClient } from '@api/client/apiClient';
import type { HistorikkinnslagDto } from '@api/hentHistorikkinnslag';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentHistorikkinnslag } from './hentHistorikkinnslag';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { get: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentHistorikkinnslag', () => {
    test('skal hente historikkinnslag for behandlingen', async () => {
        const historikkinnslag: HistorikkinnslagDto[] = [];
        vi.mocked(apiClient.get).mockResolvedValue(historikkinnslag);

        const result = await hentHistorikkinnslag(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/logg/123`,
        });
        expect(result).toEqual(historikkinnslag);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentHistorikkinnslag(123)).rejects.toThrow('Noe gikk galt');
    });
});
