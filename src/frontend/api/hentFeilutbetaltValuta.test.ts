import { apiClient } from '@api/client/apiClient';
import { hentFeilutbetaltValuta } from '@api/hentFeilutbetaltValuta';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
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

const feilutbetaltValutaPerioder = [lagFeilutbetaltValuta()];

describe('hentFeilutbetaltValuta', () => {
    test('skal hente feilutbetalt valuta for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(feilutbetaltValutaPerioder);

        const svar = await hentFeilutbetaltValuta(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(feilutbetaltValutaPerioder);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentFeilutbetaltValuta(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
