import { apiClient } from '@api/client/apiClient';
import { hentSammensattKontrollsak } from '@api/hentSammensattKontrollsak';
import { lagSammensattKontrollsak } from '@testutils/testdata/sammensattKontrollsakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 1;

describe('hentSammensattKontrollsak', () => {
    test('skal hente sammensatt kontrollsak for behandlingen', async () => {
        const sammensattKontrollsak = lagSammensattKontrollsak();
        vi.mocked(apiClient.get).mockResolvedValueOnce(sammensattKontrollsak);

        const svar = await hentSammensattKontrollsak(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/sammensatt-kontrollsak/${behandlingId}`,
        });
        expect(svar).toEqual(sammensattKontrollsak);
    });

    test('skal returnere null når behandlingen ikke har sammensatt kontrollsak', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(null);

        const svar = await hentSammensattKontrollsak(behandlingId);

        expect(svar).toBeNull();
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentSammensattKontrollsak(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
