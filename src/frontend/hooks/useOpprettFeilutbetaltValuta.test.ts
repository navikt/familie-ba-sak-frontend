import { type OpprettFeilutbetaltValutaPayload, opprettFeilutbetaltValuta } from '@api/opprettFeilutbetaltValuta';
import { useOpprettFeilutbetaltValuta } from '@hooks/useOpprettFeilutbetaltValuta';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettFeilutbetaltValuta');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

const payload: OpprettFeilutbetaltValutaPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    feilutbetaltBeløp: 1000,
};

const parameters = { behandlingId: 123, payload };

describe('useOpprettFeilutbetaltValuta', () => {
    test('skal kalle opprettFeilutbetaltValuta med riktige parametere', async () => {
        // Arrange
        vi.mocked(opprettFeilutbetaltValuta).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettFeilutbetaltValuta(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettFeilutbetaltValuta).toHaveBeenCalledWith(123, payload);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettFeilutbetaltValuta).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettFeilutbetaltValuta({ onSuccess }), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettFeilutbetaltValuta feiler', async () => {
        // Arrange
        vi.mocked(opprettFeilutbetaltValuta).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettFeilutbetaltValuta(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
