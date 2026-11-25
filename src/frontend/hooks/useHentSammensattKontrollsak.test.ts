import { hentSammensattKontrollsak } from '@api/hentSammensattKontrollsak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagSammensattKontrollsak } from '@testutils/testdata/sammensattKontrollsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentSammensattKontrollsak } from './useHentSammensattKontrollsak';

vi.mock('@api/hentSammensattKontrollsak');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentSammensattKontrollsak', () => {
    test('henter sammensatt kontrollsak for behandlingen', async () => {
        const sammensattKontrollsak = lagSammensattKontrollsak();
        vi.mocked(hentSammensattKontrollsak).mockResolvedValue(sammensattKontrollsak);

        const { result } = renderHook(() => useHentSammensattKontrollsak(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentSammensattKontrollsak).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(sammensattKontrollsak);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentSammensattKontrollsak).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentSammensattKontrollsak(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
