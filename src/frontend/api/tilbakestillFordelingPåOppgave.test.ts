import { apiClient } from '@api/client/apiClient';
import { lagOppgave } from '@testutils/testdata/oppgaveTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { tilbakestillFordelingPåOppgave } from './tilbakestillFordelingPåOppgave';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('tilbakestillFordelingPåOppgave', () => {
    test('skal tilbakestille fordelingen og returnere den oppdaterte oppgaven', async () => {
        const oppgave = lagOppgave({ id: '123' });
        vi.mocked(apiClient.post).mockResolvedValue(oppgave);

        const resultat = await tilbakestillFordelingPåOppgave({ oppgaveId: oppgave.id });

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/oppgave/123/tilbakestill',
        });
        expect(resultat).toEqual(oppgave);
    });

    test('skal kaste feil når tilbakestillingen feiler', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Tilbakestilling feilet'));

        await expect(tilbakestillFordelingPåOppgave({ oppgaveId: '123' })).rejects.toThrow('Tilbakestilling feilet');
    });
});
