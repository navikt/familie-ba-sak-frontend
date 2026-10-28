import { apiClient } from '@api/client/apiClient';
import { oppdaterVedtaksperiodeMedFritekster } from '@api/oppdaterVedtaksperiodeMedFritekster';
import { lagVedtaksperiodeMedBegrunnelser } from '@testutils/testdata/vedtaksperiodeTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const vedtaksperiodeMedBegrunnelserId = 1;
const payload = { fritekster: ['Fritekst 1', 'Fritekst 2'] };
const vedtaksperioder = [lagVedtaksperiodeMedBegrunnelser()];

describe('oppdaterVedtaksperiodeMedFritekster', () => {
    test('skal sende PUT-forespørsel med fritekster og returnere vedtaksperiodene', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(vedtaksperioder);

        const svar = await oppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId, payload);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/vedtaksperioder/fritekster/${vedtaksperiodeMedBegrunnelserId}`,
            data: payload,
        });
        expect(svar).toEqual(vedtaksperioder);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(apiClient.put).mockRejectedValueOnce(feil);

        await expect(oppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId, payload)).rejects.toBe(feil);
    });
});
