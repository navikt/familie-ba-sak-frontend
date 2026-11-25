import { slettEndretUtbetalingAndel } from '@api/slettEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useSlettEndretUtbetalingAndel } from '@hooks/useSlettEndretUtbetalingAndel';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/slettEndretUtbetalingAndel');
vi.mock('@hooks/useBehandlingId');

const behandling = lagBehandling({ behandlingId: 123 });

beforeEach(() => {
    vi.mocked(useBehandlingId).mockReturnValue(behandling.behandlingId);
});

afterEach(() => {
    vi.clearAllMocks();
});

const endretUtbetalingAndel: IRestEndretUtbetalingAndel = {
    id: 456,
    personIdenter: ['12345678910'],
};

describe('useSlettEndretUtbetalingAndel', () => {
    test('skal kalle slettEndretUtbetalingAndel med behandlingId og endret utbetalingsandel', async () => {
        vi.mocked(slettEndretUtbetalingAndel).mockResolvedValueOnce(behandling);
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useSlettEndretUtbetalingAndel(endretUtbetalingAndel, { onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(endretUtbetalingAndel);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(slettEndretUtbetalingAndel).toHaveBeenCalledWith(behandling.behandlingId, endretUtbetalingAndel);
        expect(result.current.data).toEqual(behandling);
        expect(onSuccess).toHaveBeenCalledWith(behandling, endretUtbetalingAndel, undefined, expect.any(Object));
    });

    test('skal sette isError dersom slettEndretUtbetalingAndel feiler', async () => {
        vi.mocked(slettEndretUtbetalingAndel).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSlettEndretUtbetalingAndel(endretUtbetalingAndel), {
            wrapper: TestProviders,
        });

        result.current.mutate(endretUtbetalingAndel);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
