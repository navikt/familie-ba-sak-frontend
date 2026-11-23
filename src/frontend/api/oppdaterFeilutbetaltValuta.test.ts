import { apiClient } from '@api/client/apiClient';
import { type OppdaterFeilutbetaltValutaPayload, oppdaterFeilutbetaltValuta } from '@api/oppdaterFeilutbetaltValuta';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OppdaterFeilutbetaltValutaPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    feilutbetaltBeløp: 1000,
};

const feilutbetaltValutaPerioder = [lagFeilutbetaltValuta()];

describe('oppdaterFeilutbetaltValuta', () => {
    test('skal sende forespørsel om å oppdatere feilutbetalt valuta', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(feilutbetaltValutaPerioder);

        const svar = await oppdaterFeilutbetaltValuta(123, 5, payload);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/feilutbetalt-valuta/behandling/123/periode/5',
        });
        expect(svar).toEqual(feilutbetaltValutaPerioder);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(oppdaterFeilutbetaltValuta(123, 5, payload)).rejects.toThrow('Noe gikk galt');
    });
});
