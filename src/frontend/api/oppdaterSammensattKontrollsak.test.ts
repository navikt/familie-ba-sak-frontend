import { apiClient } from '@api/client/apiClient';
import { oppdaterSammensattKontrollsak } from '@api/oppdaterSammensattKontrollsak';
import { lagSammensattKontrollsak } from '@testutils/testdata/sammensattKontrollsakTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const sammensattKontrollsak = lagSammensattKontrollsak();

describe('oppdaterSammensattKontrollsak', () => {
    test('skal sende forespørsel om å oppdatere sammensatt kontrollsak', async () => {
        const oppdatert = lagSammensattKontrollsak({ fritekst: 'Oppdatert fritekst' });
        vi.mocked(apiClient.put).mockResolvedValueOnce(oppdatert);

        const svar = await oppdaterSammensattKontrollsak(sammensattKontrollsak);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            data: sammensattKontrollsak,
            url: '/familie-ba-sak/api/sammensatt-kontrollsak',
        });
        expect(svar).toEqual(oppdatert);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(oppdaterSammensattKontrollsak(sammensattKontrollsak)).rejects.toThrow('Noe gikk galt');
    });
});
