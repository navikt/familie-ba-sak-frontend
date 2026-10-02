import { hentPersonEnkel } from '@api/hentPersonEnkel';
import { renderHook, waitFor } from '@testing-library/react';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentPersonEnkel } from './useHentPersonEnkel';

vi.mock('@api/hentPersonEnkel');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentPersonEnkel', () => {
    test('henter person med personIdent', async () => {
        const person = lagPerson();
        vi.mocked(hentPersonEnkel).mockResolvedValue(person);

        const { result } = renderHook(() => useHentPersonEnkel('12345678903'), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentPersonEnkel).toHaveBeenCalledWith({ ident: '12345678903' });
        expect(result.current.data).toBe(person);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentPersonEnkel).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentPersonEnkel('12345678903'), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
