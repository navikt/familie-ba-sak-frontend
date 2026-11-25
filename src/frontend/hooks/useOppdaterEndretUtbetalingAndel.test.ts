import { oppdaterEndretUtbetalingAndel } from '@api/oppdaterEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useOppdaterEndretUtbetalingAndel } from '@hooks/useOppdaterEndretUtbetalingAndel';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterEndretUtbetalingAndel');
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

describe('useOppdaterEndretUtbetalingAndel', () => {
    test('skal kalle oppdaterEndretUtbetalingAndel med behandlingId og endret utbetalingsandel', async () => {
        vi.mocked(oppdaterEndretUtbetalingAndel).mockResolvedValueOnce(behandling);
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useOppdaterEndretUtbetalingAndel(endretUtbetalingAndel, { onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(endretUtbetalingAndel);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterEndretUtbetalingAndel).toHaveBeenCalledWith(behandling.behandlingId, endretUtbetalingAndel);
        expect(result.current.data).toEqual(behandling);
        expect(onSuccess).toHaveBeenCalledWith(behandling, endretUtbetalingAndel, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdaterEndretUtbetalingAndel feiler', async () => {
        vi.mocked(oppdaterEndretUtbetalingAndel).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterEndretUtbetalingAndel(endretUtbetalingAndel), {
            wrapper: TestProviders,
        });

        result.current.mutate(endretUtbetalingAndel);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
