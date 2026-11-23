import { apiClient } from '@api/client/apiClient';
import { type OpprettFeilutbetaltValutaPayload, opprettFeilutbetaltValuta } from '@api/opprettFeilutbetaltValuta';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OpprettFeilutbetaltValutaPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    feilutbetaltBeløp: 1000,
};

const feilutbetaltValutaPerioder = [lagFeilutbetaltValuta()];

describe('opprettFeilutbetaltValuta', () => {
    test('skal sende forespørsel om å opprette feilutbetalt valuta', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(feilutbetaltValutaPerioder);

        const svar = await opprettFeilutbetaltValuta(123, payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/feilutbetalt-valuta/behandling/123',
        });
        expect(svar).toEqual(feilutbetaltValutaPerioder);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(opprettFeilutbetaltValuta(123, payload)).rejects.toThrow('Noe gikk galt');
    });
});
