import { apiClient } from '@api/client/apiClient';
import { slettFeilutbetaltValuta } from '@api/slettFeilutbetaltValuta';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const feilutbetaltValutaPerioder = [lagFeilutbetaltValuta()];

describe('slettFeilutbetaltValuta', () => {
    test('skal sende forespørsel om å slette feilutbetalt valuta', async () => {
        vi.mocked(apiClient.delete).mockResolvedValueOnce(feilutbetaltValutaPerioder);

        const svar = await slettFeilutbetaltValuta(123, 5);

        expect(apiClient.delete).toHaveBeenCalledTimes(1);
        expect(apiClient.delete).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/feilutbetalt-valuta/behandling/123/periode/5',
        });
        expect(svar).toEqual(feilutbetaltValutaPerioder);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.delete).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(slettFeilutbetaltValuta(123, 5)).rejects.toThrow('Noe gikk galt');
    });
});
