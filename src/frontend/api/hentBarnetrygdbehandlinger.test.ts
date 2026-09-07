import { apiClient } from '@api/client/apiClient';
import { hentBarnetrygdbehandlinger } from '@api/hentBarnetrygdbehandlinger';
import { lagVisningBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentBarnetrygdbehandlinger', () => {
    test('kaller apiClient.get med riktig URL og returnerer forventet resultat', async () => {
        const behandlinger = [lagVisningBehandling()];
        vi.mocked(apiClient.get).mockResolvedValue(behandlinger);

        const result = await hentBarnetrygdbehandlinger(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/behandlinger/fagsak/123',
        });
        expect(result).toBe(behandlinger);
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentBarnetrygdbehandlinger(123)).rejects.toThrow('Noe gikk galt');
    });
});
