import { hentMigreringsdato } from '@api/hentMigreringsdato';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentMigreringsdato } from './useHentMigreringsdato';

vi.mock('@api/hentMigreringsdato');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentMigreringsdato', () => {
    test('henter migreringsdato for behandlingen', async () => {
        vi.mocked(hentMigreringsdato).mockResolvedValue('2020-02-01');

        const { result } = renderHook(() => useHentMigreringsdato(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentMigreringsdato).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe('2020-02-01');
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentMigreringsdato).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentMigreringsdato(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
