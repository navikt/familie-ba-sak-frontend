import { apiClient } from '@api/client/apiClient';
import { hentVedtaksperioder } from '@api/hentVedtaksperioder';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentVedtaksperioder', () => {
    test('kaller apiClient.get med riktig URL og returnerer forventet resultat', async () => {
        const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [];
        vi.mocked(apiClient.get).mockResolvedValue(vedtaksperioder);

        const result = await hentVedtaksperioder(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/vedtaksperioder/behandling/123/hent-vedtaksperioder',
        });
        expect(result).toBe(vedtaksperioder);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentVedtaksperioder(123)).rejects.toThrow('Noe gikk galt');
    });
});
