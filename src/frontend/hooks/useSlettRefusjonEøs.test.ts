import { slettRefusjonEøs } from '@api/slettRefusjonEøs';
import { useSlettRefusjonEøs } from '@hooks/useSlettRefusjonEøs';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/slettRefusjonEøs');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

const parameters = { behandlingId: 123, refusjonEøsId: 5 };

describe('useSlettRefusjonEøs', () => {
    test('skal kalle slettRefusjonEøs med riktige parametere', async () => {
        // Arrange
        vi.mocked(slettRefusjonEøs).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSlettRefusjonEøs({ refusjonEøsId: 5 }), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(slettRefusjonEøs).toHaveBeenCalledWith(123, 5);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(slettRefusjonEøs).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSlettRefusjonEøs({ refusjonEøsId: 5, onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom slettRefusjonEøs feiler', async () => {
        // Arrange
        vi.mocked(slettRefusjonEøs).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSlettRefusjonEøs({ refusjonEøsId: 5 }), { wrapper: TestProviders });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
