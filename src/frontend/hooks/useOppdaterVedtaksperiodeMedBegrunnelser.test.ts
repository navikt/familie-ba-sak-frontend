import { ApiFeil } from '@api/client/apiClient';
import { oppdaterVedtaksperiodeMedBegrunnelser } from '@api/oppdaterVedtaksperiodeMedBegrunnelser';
import { useOppdaterVedtaksperiodeMedBegrunnelser } from '@hooks/useOppdaterVedtaksperiodeMedBegrunnelser';
import { renderHook, waitFor } from '@testing-library/react';
import { lagVedtaksperiodeMedBegrunnelser } from '@testutils/testdata/vedtaksperiodeTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterVedtaksperiodeMedBegrunnelser');

afterEach(() => {
    vi.clearAllMocks();
});

const vedtaksperiodeMedBegrunnelserId = 1;
const parameters = { standardbegrunnelser: ['INNVILGET_BOR_HOS_SØKER', 'INNVILGET_FØDSELSHENDELSE_NYFØDT_BARN'] };
const vedtaksperioder = [lagVedtaksperiodeMedBegrunnelser()];

describe('useOppdaterVedtaksperiodeMedBegrunnelser', () => {
    test('skal kalle oppdaterVedtaksperiodeMedBegrunnelser med id og standardbegrunnelser', async () => {
        vi.mocked(oppdaterVedtaksperiodeMedBegrunnelser).mockResolvedValueOnce(vedtaksperioder);

        const { result } = renderHook(() => useOppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterVedtaksperiodeMedBegrunnelser).toHaveBeenCalledTimes(1);
        expect(oppdaterVedtaksperiodeMedBegrunnelser).toHaveBeenCalledWith(vedtaksperiodeMedBegrunnelserId, {
            standardbegrunnelser: parameters.standardbegrunnelser,
        });
        expect(result.current.data).toEqual(vedtaksperioder);
    });

    test('skal kalle onSuccess ved vellykket oppdatering', async () => {
        const onSuccess = vi.fn();
        vi.mocked(oppdaterVedtaksperiodeMedBegrunnelser).mockResolvedValueOnce(vedtaksperioder);

        const { result } = renderHook(
            () => useOppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId, { onSuccess }),
            { wrapper: TestProviders }
        );

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(vedtaksperioder, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdateringen feiler', async () => {
        const feil = ApiFeil.fraFeilmelding('Noe gikk galt');
        vi.mocked(oppdaterVedtaksperiodeMedBegrunnelser).mockRejectedValueOnce(feil);

        const { result } = renderHook(() => useOppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
    });
});
