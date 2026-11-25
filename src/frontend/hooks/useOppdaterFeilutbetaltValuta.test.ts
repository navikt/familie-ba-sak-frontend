import { type OppdaterFeilutbetaltValutaPayload, oppdaterFeilutbetaltValuta } from '@api/oppdaterFeilutbetaltValuta';
import { useOppdaterFeilutbetaltValuta } from '@hooks/useOppdaterFeilutbetaltValuta';
import { renderHook, waitFor } from '@testing-library/react';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterFeilutbetaltValuta');

afterEach(() => {
    vi.clearAllMocks();
});

const feilutbetaltValutaPerioder = [lagFeilutbetaltValuta()];

const payload: OppdaterFeilutbetaltValutaPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    feilutbetaltBeløp: 1000,
};

const parameters = { behandlingId: 123, feilutbetaltValutaId: 5, payload };

describe('useOppdaterFeilutbetaltValuta', () => {
    test('skal kalle oppdaterFeilutbetaltValuta med riktige parametere', async () => {
        // Arrange
        vi.mocked(oppdaterFeilutbetaltValuta).mockResolvedValue(feilutbetaltValutaPerioder);

        const { result } = renderHook(() => useOppdaterFeilutbetaltValuta(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterFeilutbetaltValuta).toHaveBeenCalledWith(123, 5, payload);
        expect(result.current.data).toEqual(feilutbetaltValutaPerioder);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(oppdaterFeilutbetaltValuta).mockResolvedValue(feilutbetaltValutaPerioder);

        const { result } = renderHook(() => useOppdaterFeilutbetaltValuta({ onSuccess }), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(feilutbetaltValutaPerioder, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdaterFeilutbetaltValuta feiler', async () => {
        // Arrange
        vi.mocked(oppdaterFeilutbetaltValuta).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterFeilutbetaltValuta(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
