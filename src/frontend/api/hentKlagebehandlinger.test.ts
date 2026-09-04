import { apiClient } from '@api/client/apiClient';
import { lagKlagebehandling } from '@testutils/testdata/klageTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { hentKlagebehandlinger } from './hentKlagebehandlinger';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentKlagebehandlinger', () => {
    test('kaller apiClient.get med riktig URL, timeout og returnerer forventet resultat', async () => {
        const klagebehandlinger = [lagKlagebehandling()];
        vi.mocked(apiClient.get).mockResolvedValue(klagebehandlinger);

        const result = await hentKlagebehandlinger(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/fagsaker/123/hent-klagebehandlinger',
            timeout: 10000,
        });
        expect(result).toBe(klagebehandlinger);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentKlagebehandlinger(123)).rejects.toThrow('Noe gikk galt');
    });
});
