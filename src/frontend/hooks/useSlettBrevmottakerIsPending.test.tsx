import { slettBrevmottaker } from '@api/slettBrevmottaker';
import { useSlettBrevmottaker } from '@hooks/useSlettBrevmottaker';
import { act, renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useSlettBrevmottakerIsPending } from './useSlettBrevmottakerIsPending';

vi.mock('@api/slettBrevmottaker');

function lagDeferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>(res => {
        resolve = res;
    });
    return { promise, resolve };
}

describe('useSlettBrevmottakerIsPending', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('skal returnere false når ingen sletting pågår', () => {
        const { result } = renderHook(() => useSlettBrevmottakerIsPending(), { wrapper: TestProviders });

        expect(result.current).toBe(false);
    });

    test('skal returnere true mens sletting pågår, og false når den er ferdig', async () => {
        const behandling = lagBehandling();
        const deferred = lagDeferred<Awaited<ReturnType<typeof slettBrevmottaker>>>();
        vi.mocked(slettBrevmottaker).mockReturnValueOnce(deferred.promise);

        const { result } = renderHook(
            () => ({ isPending: useSlettBrevmottakerIsPending(), mutation: useSlettBrevmottaker() }),
            { wrapper: TestProviders }
        );

        act(() => {
            result.current.mutation.mutate({ behandlingId: behandling.behandlingId, brevmottakerId: 1 });
        });

        await waitFor(() => expect(result.current.isPending).toBe(true));

        await act(async () => {
            deferred.resolve(behandling);
        });

        await waitFor(() => expect(result.current.isPending).toBe(false));
    });
});
