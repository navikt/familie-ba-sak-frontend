import { hentTilbakekreving } from '@api/hentTilbakekreving';
import { renderHook, waitFor } from '@testing-library/react';
import { lagTilbakekreving } from '@testutils/testdata/tilbakekrevingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentTilbakekreving } from './useHentTilbakekreving';

vi.mock('@api/hentTilbakekreving');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentTilbakekreving', () => {
    test('henter tilbakekreving for behandlingen', async () => {
        const tilbakekreving = lagTilbakekreving();
        vi.mocked(hentTilbakekreving).mockResolvedValue(tilbakekreving);

        const { result } = renderHook(() => useHentTilbakekreving(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentTilbakekreving).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(tilbakekreving);
    });

    test('henter ikke tilbakekreving når enabled er false', () => {
        const { result } = renderHook(() => useHentTilbakekreving(123, { enabled: false }), {
            wrapper: TestProviders,
        });

        expect(result.current.fetchStatus).toBe('idle');
        expect(hentTilbakekreving).not.toHaveBeenCalled();
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentTilbakekreving).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentTilbakekreving(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
