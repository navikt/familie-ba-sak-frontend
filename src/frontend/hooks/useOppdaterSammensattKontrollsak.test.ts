import { oppdaterSammensattKontrollsak } from '@api/oppdaterSammensattKontrollsak';
import { useOppdaterSammensattKontrollsak } from '@hooks/useOppdaterSammensattKontrollsak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagSammensattKontrollsak } from '@testutils/testdata/sammensattKontrollsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterSammensattKontrollsak');

afterEach(() => {
    vi.clearAllMocks();
});

const payload = lagSammensattKontrollsak();
const resultat = lagSammensattKontrollsak({ fritekst: 'Oppdatert fritekst' });

describe('useOppdaterSammensattKontrollsak', () => {
    test('kaller oppdaterSammensattKontrollsak med riktig payload', async () => {
        // Arrange
        vi.mocked(oppdaterSammensattKontrollsak).mockResolvedValue(resultat);

        const { result } = renderHook(() => useOppdaterSammensattKontrollsak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterSammensattKontrollsak).toHaveBeenCalledWith(payload);
        expect(result.current.data).toEqual(resultat);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(oppdaterSammensattKontrollsak).mockResolvedValue(resultat);

        const { result } = renderHook(() => useOppdaterSammensattKontrollsak({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(resultat, payload, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdaterSammensattKontrollsak feiler', async () => {
        // Arrange
        vi.mocked(oppdaterSammensattKontrollsak).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterSammensattKontrollsak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
