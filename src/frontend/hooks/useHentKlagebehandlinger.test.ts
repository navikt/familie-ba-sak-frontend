import { hentKlagebehandlinger } from '@api/hentKlagebehandlinger';
import { renderHook, waitFor } from '@testing-library/react';
import { lagKlagebehandling } from '@testutils/testdata/klageTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useHentKlagebehandlinger } from './useHentKlagebehandlinger';

vi.mock('@api/hentKlagebehandlinger');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentKlagebehandlinger', () => {
    test('kaller hentKlagebehandlinger med fagsakId', async () => {
        const klagebehandlinger = [lagKlagebehandling()];
        vi.mocked(hentKlagebehandlinger).mockResolvedValue(klagebehandlinger);

        const { result } = renderHook(() => useHentKlagebehandlinger(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentKlagebehandlinger).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(klagebehandlinger);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentKlagebehandlinger).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentKlagebehandlinger(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
