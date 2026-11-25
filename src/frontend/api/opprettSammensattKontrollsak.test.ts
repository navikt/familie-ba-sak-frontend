import { apiClient } from '@api/client/apiClient';
import { opprettSammensattKontrollsak } from '@api/opprettSammensattKontrollsak';
import {
    lagOpprettSammensattKontrollsak,
    lagSammensattKontrollsak,
} from '@testutils/testdata/sammensattKontrollsakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload = lagOpprettSammensattKontrollsak();

describe('opprettSammensattKontrollsak', () => {
    test('skal sende forespørsel om å opprette sammensatt kontrollsak', async () => {
        const sammensattKontrollsak = lagSammensattKontrollsak();
        vi.mocked(apiClient.post).mockResolvedValueOnce(sammensattKontrollsak);

        const svar = await opprettSammensattKontrollsak(payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/sammensatt-kontrollsak',
        });
        expect(svar).toEqual(sammensattKontrollsak);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(opprettSammensattKontrollsak(payload)).rejects.toThrow('Noe gikk galt');
    });
});
