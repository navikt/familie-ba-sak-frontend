import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentEndringstidspunkt } from './hentEndringstidspunkt';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentEndringstidspunkt', () => {
    test('kaller apiClient.get med riktig URL og returnerer endringstidspunktet', async () => {
        const endringstidspunkt = '2025-01-01';
        vi.mocked(apiClient.get).mockResolvedValue(endringstidspunkt);

        const result = await hentEndringstidspunkt(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/behandlinger/123/endringstidspunkt',
        });
        expect(result).toBe(endringstidspunkt);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentEndringstidspunkt(123)).rejects.toThrow('Noe gikk galt');
    });
});
