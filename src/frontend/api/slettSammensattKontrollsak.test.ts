import { apiClient } from '@api/client/apiClient';
import { slettSammensattKontrollsak } from '@api/slettSammensattKontrollsak';
import { lagSammensattKontrollsak } from '@testutils/testdata/sammensattKontrollsakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const sammensattKontrollsak = lagSammensattKontrollsak({ id: 42 });

describe('slettSammensattKontrollsak', () => {
    test('skal sende forespørsel om å slette sammensatt kontrollsak', async () => {
        vi.mocked(apiClient.delete).mockResolvedValueOnce(42);

        const svar = await slettSammensattKontrollsak(sammensattKontrollsak);

        expect(apiClient.delete).toHaveBeenCalledTimes(1);
        expect(apiClient.delete).toHaveBeenCalledWith({
            data: sammensattKontrollsak,
            url: '/familie-ba-sak/api/sammensatt-kontrollsak',
        });
        expect(svar).toBe(42);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.delete).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(slettSammensattKontrollsak(sammensattKontrollsak)).rejects.toThrow('Noe gikk galt');
    });
});
