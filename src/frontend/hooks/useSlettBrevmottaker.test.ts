import { slettBrevmottaker } from '@api/slettBrevmottaker';
import { useSlettBrevmottaker } from '@hooks/useSlettBrevmottaker';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/slettBrevmottaker');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const brevmottakere = [lagBrevmottakerBehandling()];

const parameters = {
    behandlingId: behandling.behandlingId,
    brevmottakerId: 456,
};

describe('useSlettBrevmottaker', () => {
    test('skal kalle slettBrevmottaker med riktige parametere', async () => {
        vi.mocked(slettBrevmottaker).mockResolvedValue(brevmottakere);

        const { result } = renderHook(() => useSlettBrevmottaker(), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(slettBrevmottaker).toHaveBeenCalledWith(parameters);
        expect(result.current.data).toEqual(brevmottakere);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        const onSuccess = vi.fn();
        vi.mocked(slettBrevmottaker).mockResolvedValue(brevmottakere);

        const { result } = renderHook(() => useSlettBrevmottaker({ onSuccess }), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(brevmottakere, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom slettBrevmottaker feiler', async () => {
        vi.mocked(slettBrevmottaker).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSlettBrevmottaker(), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
