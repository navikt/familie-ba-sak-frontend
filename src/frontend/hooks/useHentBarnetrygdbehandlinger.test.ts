import { hentBarnetrygdbehandlinger } from '@api/hentBarnetrygdbehandlinger';
import { renderHook, waitFor } from '@testing-library/react';
import { lagVisningBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useHentBarnetrygdbehandlinger } from './useHentBarnetrygdbehandlinger';

vi.mock('@api/hentBarnetrygdbehandlinger');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentBarnetrygdbehandlinger', () => {
    test('kaller hentBarnetrygdbehandlinger med fagsakId', async () => {
        const behandlinger = [lagVisningBehandling()];
        vi.mocked(hentBarnetrygdbehandlinger).mockResolvedValue(behandlinger);

        const { result } = renderHook(() => useHentBarnetrygdbehandlinger(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentBarnetrygdbehandlinger).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(behandlinger);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentBarnetrygdbehandlinger).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentBarnetrygdbehandlinger(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
