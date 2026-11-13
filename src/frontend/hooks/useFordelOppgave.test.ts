import { fordelOppgave } from '@api/fordelOppgave';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useFordelOppgave } from './useFordelOppgave';

vi.mock('@api/fordelOppgave');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useFordelOppgave', () => {
    test('skal fordele oppgaven og kalle onSuccess', async () => {
        const onSuccess = vi.fn();
        const parameters = { oppgaveId: '123', saksbehandler: 'Z999999' };
        vi.mocked(fordelOppgave).mockResolvedValue('123');

        const { result } = renderHook(() => useFordelOppgave({ onSuccess }), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fordelOppgave).toHaveBeenCalledWith({ oppgaveId: '123' }, { saksbehandler: 'Z999999' });
        expect(result.current.data).toBe('123');
        expect(onSuccess).toHaveBeenCalledWith('123', parameters, undefined, expect.any(Object));
    });

    test('skal håndtere feil ved fordeling', async () => {
        vi.mocked(fordelOppgave).mockRejectedValue(new Error('Fordeling feilet'));
        const { result } = renderHook(() => useFordelOppgave(), { wrapper: TestProviders });

        result.current.mutate({ oppgaveId: '123', saksbehandler: 'Z999999' });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Fordeling feilet');
    });
});
