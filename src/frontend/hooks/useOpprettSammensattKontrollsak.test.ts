import { opprettSammensattKontrollsak } from '@api/opprettSammensattKontrollsak';
import { useOpprettSammensattKontrollsak } from '@hooks/useOpprettSammensattKontrollsak';
import { renderHook, waitFor } from '@testing-library/react';
import {
    lagOpprettSammensattKontrollsak,
    lagSammensattKontrollsak,
} from '@testutils/testdata/sammensattKontrollsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettSammensattKontrollsak');

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 1;
const payload = lagOpprettSammensattKontrollsak();
const resultat = lagSammensattKontrollsak();

describe('useOpprettSammensattKontrollsak', () => {
    test('kaller opprettSammensattKontrollsak med riktig payload', async () => {
        // Arrange
        vi.mocked(opprettSammensattKontrollsak).mockResolvedValue(resultat);

        const { result } = renderHook(() => useOpprettSammensattKontrollsak(behandlingId), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettSammensattKontrollsak).toHaveBeenCalledWith(payload);
        expect(result.current.data).toEqual(resultat);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettSammensattKontrollsak).mockResolvedValue(resultat);

        const { result } = renderHook(() => useOpprettSammensattKontrollsak(behandlingId, { onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(resultat, payload, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettSammensattKontrollsak feiler', async () => {
        // Arrange
        vi.mocked(opprettSammensattKontrollsak).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettSammensattKontrollsak(behandlingId), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
