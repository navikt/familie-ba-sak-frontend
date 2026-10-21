import { hentFagsakPåPerson } from '@api/hentFagsakPåPerson';
import { useHentFagsakPåPerson } from '@hooks/useHentFagsakPåPerson';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/hentFagsakPåPerson');

afterEach(() => {
    vi.clearAllMocks();
});

const parameters = { personIdent: '12345678910' };

describe('useHentFagsakPåPerson', () => {
    test('kaller hentFagsakPåPerson med riktig payload', async () => {
        // Arrange
        const respons = lagFagsak();
        vi.mocked(hentFagsakPåPerson).mockResolvedValue(respons);

        const { result } = renderHook(() => useHentFagsakPåPerson(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentFagsakPåPerson).toHaveBeenCalledWith({ personIdent: '12345678910' });
        expect(result.current.data).toEqual(respons);
    });

    test('skal sette isError dersom hentFagsakPåPerson feiler', async () => {
        // Arrange
        vi.mocked(hentFagsakPåPerson).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentFagsakPåPerson(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
