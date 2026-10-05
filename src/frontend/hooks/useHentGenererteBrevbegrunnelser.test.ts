import { hentGenererteBrevbegrunnelser } from '@api/hentGenererteBrevbegrunnelser';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentGenererteBrevbegrunnelser } from './useHentGenererteBrevbegrunnelser';

vi.mock('@api/hentGenererteBrevbegrunnelser');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentGenererteBrevbegrunnelser', () => {
    test('henter genererte brevbegrunnelser for vedtaksperioden', async () => {
        const begrunnelser = ['Begrunnelse 1', 'Begrunnelse 2'];
        vi.mocked(hentGenererteBrevbegrunnelser).mockResolvedValue(begrunnelser);

        const { result } = renderHook(() => useHentGenererteBrevbegrunnelser(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentGenererteBrevbegrunnelser).toHaveBeenCalledWith(123);
        expect(result.current.data).toEqual(begrunnelser);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentGenererteBrevbegrunnelser).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentGenererteBrevbegrunnelser(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
