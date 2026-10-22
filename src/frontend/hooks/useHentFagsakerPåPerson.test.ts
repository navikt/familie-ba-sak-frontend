import { hentFagsaker } from '@api/hentFagsaker';
import { useHentFagsakerPåPerson } from '@hooks/useHentFagsakerPåPerson';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/hentFagsaker');

afterEach(() => {
    vi.clearAllMocks();
});

const parameters = { personIdent: '12345678910' };

describe('useHentFagsakerPåPerson', () => {
    test('kaller hentFagsaker med riktig payload', async () => {
        // Arrange
        const respons = [lagFagsak()];
        vi.mocked(hentFagsaker).mockResolvedValue(respons);

        const { result } = renderHook(() => useHentFagsakerPåPerson(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentFagsaker).toHaveBeenCalledWith({ personIdent: '12345678910' });
        expect(result.current.data).toEqual(respons);
    });

    test('skal sette isError dersom hentFagsaker feiler', async () => {
        // Arrange
        vi.mocked(hentFagsaker).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentFagsakerPåPerson(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
