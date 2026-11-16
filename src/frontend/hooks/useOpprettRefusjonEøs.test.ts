import { type OpprettRefusjonEøsPayload, opprettRefusjonEøs } from '@api/opprettRefusjonEøs';
import { useOpprettRefusjonEøs } from '@hooks/useOpprettRefusjonEøs';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettRefusjonEøs');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

const payload: OpprettRefusjonEøsPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    refusjonsbeløp: 1000,
    land: 'SE',
    refusjonAvklart: true,
};

const parameters = { behandlingId: 123, payload };

describe('useOpprettRefusjonEøs', () => {
    test('skal kalle opprettRefusjonEøs med riktige parametere', async () => {
        // Arrange
        vi.mocked(opprettRefusjonEøs).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettRefusjonEøs(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettRefusjonEøs).toHaveBeenCalledWith(123, payload);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettRefusjonEøs).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettRefusjonEøs({ onSuccess }), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettRefusjonEøs feiler', async () => {
        // Arrange
        vi.mocked(opprettRefusjonEøs).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettRefusjonEøs(), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
