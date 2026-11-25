import { tilbakestillFordelingPåOppgave } from '@api/tilbakestillFordelingPåOppgave';
import { renderHook, waitFor } from '@testing-library/react';
import { lagOppgave } from '@testutils/testdata/oppgaveTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useTilbakestillFordelingPåOppgave } from './useTilbakestillFordelingPåOppgave';

vi.mock('@api/tilbakestillFordelingPåOppgave');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useTilbakestillFordelingPåOppgave', () => {
    test('skal tilbakestille oppgaven og kalle onSuccess med oppdatert oppgave', async () => {
        const oppgave = lagOppgave({ id: '123' });
        const onSuccess = vi.fn();
        const parameters = { oppgaveId: oppgave.id };
        vi.mocked(tilbakestillFordelingPåOppgave).mockResolvedValue(oppgave);

        const { result } = renderHook(() => useTilbakestillFordelingPåOppgave({ onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(tilbakestillFordelingPåOppgave).toHaveBeenCalledWith(parameters);
        expect(result.current.data).toEqual(oppgave);
        expect(onSuccess).toHaveBeenCalledWith(oppgave, parameters, undefined, expect.any(Object));
    });

    test('skal håndtere feil ved tilbakestilling', async () => {
        vi.mocked(tilbakestillFordelingPåOppgave).mockRejectedValue(new Error('Tilbakestilling feilet'));
        const { result } = renderHook(() => useTilbakestillFordelingPåOppgave(), { wrapper: TestProviders });

        result.current.mutate({ oppgaveId: '123' });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Tilbakestilling feilet');
    });
});
