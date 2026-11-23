import { hentFeilutbetaltValuta } from '@api/hentFeilutbetaltValuta';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentFeilutbetaltValuta } from './useHentFeilutbetaltValuta';

vi.mock('@api/hentFeilutbetaltValuta');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentFeilutbetaltValuta', () => {
    test('henter feilutbetalt valuta for behandlingen', async () => {
        const feilutbetaltValutaPerioder: IRestFeilutbetaltValuta[] = [];
        vi.mocked(hentFeilutbetaltValuta).mockResolvedValue(feilutbetaltValutaPerioder);

        const { result } = renderHook(() => useHentFeilutbetaltValuta(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentFeilutbetaltValuta).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(feilutbetaltValutaPerioder);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentFeilutbetaltValuta).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentFeilutbetaltValuta(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
