import { slettFeilutbetaltValuta } from '@api/slettFeilutbetaltValuta';
import { useSlettFeilutbetaltValuta } from '@hooks/useSlettFeilutbetaltValuta';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/slettFeilutbetaltValuta');

afterEach(() => {
    vi.clearAllMocks();
});

const feilutbetaltValutaPerioder = [lagFeilutbetaltValuta()];

const parameters = { behandlingId: 123, feilutbetaltValutaId: 5 };

describe('useSlettFeilutbetaltValuta', () => {
    test('skal kalle slettFeilutbetaltValuta med riktige parametere', async () => {
        // Arrange
        vi.mocked(slettFeilutbetaltValuta).mockResolvedValue(feilutbetaltValutaPerioder);

        const { result } = renderHook(() => useSlettFeilutbetaltValuta({ feilutbetaltValutaId: 5 }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(slettFeilutbetaltValuta).toHaveBeenCalledWith(123, 5);
        expect(result.current.data).toEqual(feilutbetaltValutaPerioder);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(slettFeilutbetaltValuta).mockResolvedValue(feilutbetaltValutaPerioder);

        const { result } = renderHook(() => useSlettFeilutbetaltValuta({ feilutbetaltValutaId: 5, onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(feilutbetaltValutaPerioder, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom slettFeilutbetaltValuta feiler', async () => {
        // Arrange
        vi.mocked(slettFeilutbetaltValuta).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSlettFeilutbetaltValuta({ feilutbetaltValutaId: 5 }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
