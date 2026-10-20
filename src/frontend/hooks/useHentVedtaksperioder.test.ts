import { hentVedtaksperioder } from '@api/hentVedtaksperioder';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentVedtaksperioder } from './useHentVedtaksperioder';

vi.mock('@api/hentVedtaksperioder');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentVedtaksperioder', () => {
    test('henter vedtaksperioder for behandlingen', async () => {
        const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [];
        vi.mocked(hentVedtaksperioder).mockResolvedValue(vedtaksperioder);

        const { result } = renderHook(() => useHentVedtaksperioder(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentVedtaksperioder).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(vedtaksperioder);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentVedtaksperioder).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentVedtaksperioder(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
