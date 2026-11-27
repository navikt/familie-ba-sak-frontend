import { opprettEndretUtbetalingAndel } from '@api/opprettEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useOpprettEndretUtbetalingAndel } from '@hooks/useOpprettEndretUtbetalingAndel';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettEndretUtbetalingAndel');
vi.mock('@hooks/useBehandlingId');

const behandling = lagBehandling({ behandlingId: 123 });

beforeEach(() => {
    vi.mocked(useBehandlingId).mockReturnValue(behandling.behandlingId);
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('useOpprettEndretUtbetalingAndel', () => {
    test('skal kalle opprettEndretUtbetalingAndel med behandlingId og returnere behandlingen', async () => {
        // Arrange
        vi.mocked(opprettEndretUtbetalingAndel).mockResolvedValueOnce(behandling);
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useOpprettEndretUtbetalingAndel({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate();

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettEndretUtbetalingAndel).toHaveBeenCalledWith(behandling.behandlingId);
        expect(result.current.data).toEqual(behandling);
        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    test('skal sette isError dersom opprettEndretUtbetalingAndel feiler', async () => {
        // Arrange
        vi.mocked(opprettEndretUtbetalingAndel).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettEndretUtbetalingAndel(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate();

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
