import { hentKorrigertEtterbetaling } from '@api/hentKorrigertEtterbetaling';
import { renderHook, waitFor } from '@testing-library/react';
import { lagKorrigertEtterbetaling } from '@testutils/testdata/korrigertEtterbetalingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentKorrigertEtterbetaling } from './useHentKorrigertEtterbetaling';

vi.mock('@api/hentKorrigertEtterbetaling');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentKorrigertEtterbetaling', () => {
    test('henter korrigert etterbetaling for behandlingen', async () => {
        const korrigertEtterbetaling = lagKorrigertEtterbetaling();
        vi.mocked(hentKorrigertEtterbetaling).mockResolvedValue(korrigertEtterbetaling);

        const { result } = renderHook(() => useHentKorrigertEtterbetaling(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentKorrigertEtterbetaling).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(korrigertEtterbetaling);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentKorrigertEtterbetaling).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentKorrigertEtterbetaling(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
