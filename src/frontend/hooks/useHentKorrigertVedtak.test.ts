import { hentKorrigertVedtak } from '@api/hentKorrigertVedtak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagKorrigertVedtak } from '@testutils/testdata/korrigertVedtakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentKorrigertVedtak } from './useHentKorrigertVedtak';

vi.mock('@api/hentKorrigertVedtak');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentKorrigertVedtak', () => {
    test('henter korrigert vedtak for behandlingen', async () => {
        const korrigertVedtak = lagKorrigertVedtak();
        vi.mocked(hentKorrigertVedtak).mockResolvedValue(korrigertVedtak);

        const { result } = renderHook(() => useHentKorrigertVedtak(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentKorrigertVedtak).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(korrigertVedtak);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentKorrigertVedtak).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentKorrigertVedtak(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
