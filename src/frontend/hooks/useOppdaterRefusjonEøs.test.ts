import { type OppdaterRefusjonEøsPayload, oppdaterRefusjonEøs } from '@api/oppdaterRefusjonEøs';
import { useOppdaterRefusjonEøs } from '@hooks/useOppdaterRefusjonEøs';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterRefusjonEøs');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

const payload: OppdaterRefusjonEøsPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    refusjonsbeløp: 1000,
    land: 'SE',
    refusjonAvklart: false,
};

const parameters = { behandlingId: 123, refusjonEøsId: 5, payload };

describe('useOppdaterRefusjonEøs', () => {
    test('skal kalle oppdaterRefusjonEøs med riktige parametere', async () => {
        // Arrange
        vi.mocked(oppdaterRefusjonEøs).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterRefusjonEøs(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterRefusjonEøs).toHaveBeenCalledWith(123, 5, payload);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(oppdaterRefusjonEøs).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterRefusjonEøs({ onSuccess }), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdaterRefusjonEøs feiler', async () => {
        // Arrange
        vi.mocked(oppdaterRefusjonEøs).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterRefusjonEøs(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
