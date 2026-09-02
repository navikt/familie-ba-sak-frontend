import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentJournalpostDokumentPdf } from './hentJournalpostDokumentPdf';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const base64Pdf = 'JVBERi0xLjQK'; // base64-encodet "%PDF-1.4"

describe('hentJournalpostDokumentPdf', () => {
    test('kaller apiClient.get med riktig URL', async () => {
        vi.mocked(apiClient.get).mockResolvedValue(base64Pdf);

        const result = await hentJournalpostDokumentPdf('123', '456');

        expect(apiClient.get).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/journalpost/123/hent/456',
        });
        expect(result).toBe(base64Pdf);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentJournalpostDokumentPdf('123', '456')).rejects.toThrow('Noe gikk galt');
    });
});
