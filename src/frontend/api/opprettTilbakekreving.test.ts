import { apiClient } from '@api/client/apiClient';
import { opprettTilbakekreving } from '@api/opprettTilbakekreving';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('opprettTilbakekreving', () => {
    test('skal sende forespørsel om opprettelse av tilbakekreving', async () => {
        const fagsakId = 123;
        vi.mocked(apiClient.get).mockResolvedValueOnce('Tilbakekreving opprettet');

        const svar = await opprettTilbakekreving(fagsakId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-tilbakekreving`,
        });
        expect(svar).toEqual('Tilbakekreving opprettet');
    });

    test('skal håndtere feil', async () => {
        const fagsakId = 123;
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(opprettTilbakekreving(fagsakId)).rejects.toThrow('Noe gikk galt');
    });
});
