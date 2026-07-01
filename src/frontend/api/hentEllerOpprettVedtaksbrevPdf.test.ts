import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentEllerOpprettVedtaksbrevPdf } from './hentEllerOpprettVedtaksbrevPdf';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        request: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const base64Pdf = 'JVBERi0xLjQK'; // base64-encodet "%PDF-1.4"

describe('hentEllerOpprettVedtaksbrevPdf', () => {
    test.each(['GET', 'POST'] as const)(
        'kaller apiClient.request med httpMethod %s og riktig URL',
        async httpMethod => {
            vi.mocked(apiClient.request).mockResolvedValue(base64Pdf);

            const result = await hentEllerOpprettVedtaksbrevPdf(httpMethod, { vedtakId: 123 });

            expect(apiClient.request).toHaveBeenCalledWith({
                method: httpMethod,
                url: '/familie-ba-sak/api/dokument/vedtaksbrev/123',
            });
            expect(result).toBe(base64Pdf);
        }
    );

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.request).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentEllerOpprettVedtaksbrevPdf('POST', { vedtakId: 123 })).rejects.toThrow('Noe gikk galt');
    });
});
