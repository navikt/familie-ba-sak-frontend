import { hentFagsaker } from '@api/hentFagsaker';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { mapMinimalFagsakTilBaseFagsak } from '@typer/fagsak';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useHentFagsaker } from './useHentFagsaker';

vi.mock('@api/hentFagsaker');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentFagsaker', () => {
    test('henter fagsaker for personIdent og mapper dem til basefagsaker', async () => {
        const fagsaker = [lagFagsak()];
        vi.mocked(hentFagsaker).mockResolvedValue(fagsaker);

        const { result } = renderHook(() => useHentFagsaker('12345678910'), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentFagsaker).toHaveBeenCalledWith({ personIdent: '12345678910' });
        expect(result.current.data).toEqual(fagsaker.map(mapMinimalFagsakTilBaseFagsak));
    });

    test('respekterer query options', () => {
        const { result } = renderHook(() => useHentFagsaker('12345678910', { enabled: false }), {
            wrapper: TestProviders,
        });

        expect(result.current.fetchStatus).toBe('idle');
        expect(hentFagsaker).not.toHaveBeenCalled();
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentFagsaker).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentFagsaker('12345678910'), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
