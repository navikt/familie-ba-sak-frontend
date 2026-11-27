import { låsOppFagsak } from '@api/låsOppFagsak';
import { useLåsOppFagsak } from '@hooks/useLåsOppFagsak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { FagsakId } from '@typer/fagsak';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/låsOppFagsak');

afterEach(() => {
    vi.clearAllMocks();
});

const fagsakId = FagsakId.fra(123);
const parameters = { fagsakId, begrunnelse: 'En begrunnelse' };
const fagsak = lagFagsak({ id: fagsakId });

describe('useLåsOppFagsak', () => {
    test('skal kalle låsOppFagsak med fagsakId og begrunnelse', async () => {
        // Arrange
        vi.mocked(låsOppFagsak).mockResolvedValue(fagsak);

        const { result } = renderHook(() => useLåsOppFagsak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(låsOppFagsak).toHaveBeenCalledWith(fagsakId, { begrunnelse: 'En begrunnelse' });
        expect(result.current.data).toEqual(fagsak);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(låsOppFagsak).mockResolvedValue(fagsak);

        const { result } = renderHook(() => useLåsOppFagsak({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(fagsak, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom låsOppFagsak feiler', async () => {
        // Arrange
        vi.mocked(låsOppFagsak).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useLåsOppFagsak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
