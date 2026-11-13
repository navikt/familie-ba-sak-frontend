import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { fordelOppgave } from './fordelOppgave';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('fordelOppgave', () => {
    test('skal fordele oppgaven med saksbehandler som query-parameter', async () => {
        vi.mocked(apiClient.post).mockResolvedValue('123');

        const resultat = await fordelOppgave({ oppgaveId: '123' }, { saksbehandler: 'Z999999' });

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/oppgave/123/fordel',
            params: { saksbehandler: 'Z999999' },
        });
        expect(resultat).toBe('123');
    });

    test('skal kaste feil når fordelingen feiler', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Fordeling feilet'));

        await expect(fordelOppgave({ oppgaveId: '123' }, { saksbehandler: 'Z999999' })).rejects.toThrow(
            'Fordeling feilet'
        );
    });
});
