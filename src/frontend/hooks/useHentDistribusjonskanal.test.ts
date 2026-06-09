import { hentDistribusjonskanal } from '@api/hentDistribusjonskanal';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { Distribusjonskanal } from '@typer/dokument';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentDistribusjonskanal } from './useHentDistribusjonskanal';

vi.mock('@api/hentDistribusjonskanal');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentDistribusjonskanal', () => {
    test('kaller hentDistribusjonskanal med personIdent', async () => {
        vi.mocked(hentDistribusjonskanal).mockResolvedValue(Distribusjonskanal.DITT_NAV);

        const { result } = renderHook(() => useHentDistribusjonskanal('12345678903'), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentDistribusjonskanal).toHaveBeenCalledWith(expect.any(Function), '12345678903');
        expect(result.current.data).toBe(Distribusjonskanal.DITT_NAV);
    });

    test('henter på nytt når personIdent endres', async () => {
        vi.mocked(hentDistribusjonskanal)
            .mockResolvedValueOnce(Distribusjonskanal.DITT_NAV)
            .mockResolvedValueOnce(Distribusjonskanal.PRINT);

        let personIdent = '12345678903';
        const { result, rerender } = renderHook(() => useHentDistribusjonskanal(personIdent), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.data).toBe(Distribusjonskanal.DITT_NAV));

        personIdent = '98765432100';
        rerender();

        await waitFor(() => expect(result.current.data).toBe(Distribusjonskanal.PRINT));
        expect(hentDistribusjonskanal).toHaveBeenCalledTimes(2);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentDistribusjonskanal).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentDistribusjonskanal('12345678903'), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
