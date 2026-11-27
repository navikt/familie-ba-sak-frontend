import { type OpprettFagsakPayload, opprettFagsak } from '@api/opprettFagsak';
import { useOpprettFagsak } from '@hooks/useOpprettFagsak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { FagsakType } from '@typer/fagsak';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettFagsak');

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OpprettFagsakPayload = {
    personIdent: '12345678910',
    fagsakType: FagsakType.NORMAL,
    institusjon: null,
    skjermetBarnSøker: null,
};

const fagsak = lagFagsak();

describe('useOpprettFagsak', () => {
    test('skal kalle opprettFagsak med riktig payload', async () => {
        // Arrange
        vi.mocked(opprettFagsak).mockResolvedValue(fagsak);

        const { result } = renderHook(() => useOpprettFagsak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettFagsak).toHaveBeenCalledWith(payload);
        expect(result.current.data).toEqual(fagsak);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettFagsak).mockResolvedValue(fagsak);

        const { result } = renderHook(() => useOpprettFagsak({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(fagsak, payload, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettFagsak feiler', async () => {
        // Arrange
        vi.mocked(opprettFagsak).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettFagsak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
