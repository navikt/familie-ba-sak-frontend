import { ApiFeil } from '@api/client/apiClient';
import { oppdaterVedtaksperiodeMedFritekster } from '@api/oppdaterVedtaksperiodeMedFritekster';
import { useOppdaterVedtaksperiodeMedFritekster } from '@hooks/useOppdaterVedtaksperiodeMedFritekster';
import { renderHook, waitFor } from '@testing-library/react';
import { lagVedtaksperiodeMedBegrunnelser } from '@testutils/testdata/vedtaksperiodeTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterVedtaksperiodeMedFritekster');

afterEach(() => {
    vi.clearAllMocks();
});

const vedtaksperiodeMedBegrunnelserId = 1;
const parameters = { fritekster: ['Fritekst 1', 'Fritekst 2'] };
const vedtaksperioder = [lagVedtaksperiodeMedBegrunnelser()];

describe('useOppdaterVedtaksperiodeMedFritekster', () => {
    test('skal kalle oppdaterVedtaksperiodeMedFritekster med id og fritekster', async () => {
        vi.mocked(oppdaterVedtaksperiodeMedFritekster).mockResolvedValueOnce(vedtaksperioder);

        const { result } = renderHook(() => useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterVedtaksperiodeMedFritekster).toHaveBeenCalledTimes(1);
        expect(oppdaterVedtaksperiodeMedFritekster).toHaveBeenCalledWith(vedtaksperiodeMedBegrunnelserId, {
            fritekster: parameters.fritekster,
        });
        expect(result.current.data).toEqual(vedtaksperioder);
    });

    test('skal kalle onSuccess ved vellykket oppdatering', async () => {
        const onSuccess = vi.fn();
        vi.mocked(oppdaterVedtaksperiodeMedFritekster).mockResolvedValueOnce(vedtaksperioder);

        const { result } = renderHook(
            () => useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId, { onSuccess }),
            { wrapper: TestProviders }
        );

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(vedtaksperioder, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdateringen feiler', async () => {
        const feil = ApiFeil.fraFeilmelding('Noe gikk galt');
        vi.mocked(oppdaterVedtaksperiodeMedFritekster).mockRejectedValueOnce(feil);

        const { result } = renderHook(() => useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
    });
});
