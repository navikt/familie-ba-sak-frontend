import { apiClient } from '@api/client/apiClient';
import { opprettKlagebehandling } from '@api/opprettKlagebehandling';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('opprettKlagebehandling', () => {
    test('skal sende forespørsel om opprettelse av klagebehandling', async () => {
        const payload = {
            klageMottattDato: '2026-08-05',
        };

        const fagsakId = 123;

        vi.mocked(apiClient.post).mockResolvedValueOnce(fagsakId);

        const svar = await opprettKlagebehandling(payload, fagsakId);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-klagebehandling`,
        });
        expect(svar).toEqual(fagsakId);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        const payload = {
            klageMottattDato: '2026-08-05',
        };
        const fagsakId = 123;

        await expect(opprettKlagebehandling(payload, fagsakId)).rejects.toThrow('Noe gikk galt');
    });
});
