import { opprettBrevmottaker } from '@api/opprettBrevmottaker';
import { useOpprettBrevmottaker } from '@hooks/useOpprettBrevmottaker';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottaker } from '@testutils/testdata/brevmottakerTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettBrevmottaker');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const brevmottaker = lagBrevmottaker();

const parameters = {
    ...brevmottaker,
    behandlingId: behandling.behandlingId,
};

describe('useOpprettBrevmottaker', () => {
    test('skal kalle opprettBrevmottaker med riktig payload', async () => {
        vi.mocked(opprettBrevmottaker).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettBrevmottaker(), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettBrevmottaker).toHaveBeenCalledWith(behandling.behandlingId, brevmottaker);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        const onSuccess = vi.fn();
        vi.mocked(opprettBrevmottaker).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettBrevmottaker({ onSuccess }), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettBrevmottaker feiler', async () => {
        vi.mocked(opprettBrevmottaker).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettBrevmottaker(), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
