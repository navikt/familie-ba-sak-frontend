import { hentRefusjonEøs } from '@api/hentRefusjonEøs';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentRefusjonEøs } from './useHentRefusjonEøs';

vi.mock('@api/hentRefusjonEøs');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentRefusjonEøs', () => {
    test('henter refusjon EØS for behandlingen', async () => {
        const refusjonEøsPerioder: IRestRefusjonEøs[] = [];
        vi.mocked(hentRefusjonEøs).mockResolvedValue(refusjonEøsPerioder);

        const { result } = renderHook(() => useHentRefusjonEøs(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentRefusjonEøs).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(refusjonEøsPerioder);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentRefusjonEøs).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentRefusjonEøs(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
