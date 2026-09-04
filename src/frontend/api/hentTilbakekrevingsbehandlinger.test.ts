import { apiClient } from '@api/client/apiClient';
import { lagTilbakekrevingbehandling } from '@testutils/testdata/tilbakekrevingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { hentTilbakekrevingsbehandlinger } from './hentTilbakekrevingsbehandlinger';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentTilbakekrevingsbehandlinger', () => {
    test('kaller apiClient.get med riktig URL, timeout og returnerer forventet resultat', async () => {
        const tilbakekrevingsbehandlinger = [lagTilbakekrevingbehandling()];
        vi.mocked(apiClient.get).mockResolvedValue(tilbakekrevingsbehandlinger);

        const result = await hentTilbakekrevingsbehandlinger(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/tilbakekreving/fagsak/123',
            timeout: 10000,
        });
        expect(result).toBe(tilbakekrevingsbehandlinger);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentTilbakekrevingsbehandlinger(123)).rejects.toThrow('Noe gikk galt');
    });
});
