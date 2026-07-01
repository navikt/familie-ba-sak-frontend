import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentEllerOpprettTilbakekrevingsvedtaksbrev } from './hentEllerOpprettTilbakekrevingsvedtaksbrev';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        request: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentEllerOpprettTilbakekrevingsvedtaksbrev', () => {
    test.each(['GET', 'POST'] as const)(
        'kaller apiClient.request med riktig URL og httpMethod %s',
        async httpMethod => {
            vi.mocked(apiClient.request).mockResolvedValue('JVBERi0xLjQK');

            const result = await hentEllerOpprettTilbakekrevingsvedtaksbrev(httpMethod, { behandlingId: 123 });

            expect(apiClient.request).toHaveBeenCalledWith({
                method: httpMethod,
                url: '/familie-ba-sak/api/behandling/123/tilbakekrevingsvedtak-motregning/pdf',
            });
            expect(result).toBe('JVBERi0xLjQK');
        }
    );

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.request).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentEllerOpprettTilbakekrevingsvedtaksbrev('GET', { behandlingId: 123 })).rejects.toThrow(
            'Noe gikk galt'
        );
    });
});
