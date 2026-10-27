import { apiClient } from '@api/client/apiClient';
import { oppdaterVedtaksperiodeMedBegrunnelser } from '@api/oppdaterVedtaksperiodeMedBegrunnelser';
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
const payload = { standardbegrunnelser: ['INNVILGET_BOR_HOS_SØKER', 'INNVILGET_FØDSELSHENDELSE_NYFØDT_BARN'] };
const vedtaksperioder = [lagVedtaksperiodeMedBegrunnelser()];

describe('oppdaterVedtaksperiodeMedBegrunnelser', () => {
    test('skal sende PUT-forespørsel med standardbegrunnelser og returnere vedtaksperiodene', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(vedtaksperioder);

        const svar = await oppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId, payload);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/${vedtaksperiodeMedBegrunnelserId}`,
            data: payload,
        });
        expect(svar).toEqual(vedtaksperioder);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(apiClient.put).mockRejectedValueOnce(feil);

        await expect(oppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId, payload)).rejects.toBe(
            feil
        );
    });
});
