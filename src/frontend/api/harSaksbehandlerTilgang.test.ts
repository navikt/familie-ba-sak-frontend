import { apiClient } from '@api/client/apiClient';
import { harSaksbehandlerTilgang } from '@api/harSaksbehandlerTilgang';
import { Adressebeskyttelsegradering, type IRestTilgang } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('harSaksbehandlerTilgang', () => {
    test('skal sende forespørsel om saksbehandler har tilgang', async () => {
        const payload = {
            brukerIdent: 'Z123456',
        };

        const tilgang: IRestTilgang = {
            saksbehandlerHarTilgang: true,
            adressebeskyttelsegradering: Adressebeskyttelsegradering.UGRADERT,
        };

        vi.mocked(apiClient.post).mockResolvedValueOnce(tilgang);

        const svar = await harSaksbehandlerTilgang(payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/tilgang',
        });
        expect(svar).toEqual(tilgang);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        const payload = {
            brukerIdent: 'Z123456',
        };

        await expect(harSaksbehandlerTilgang(payload)).rejects.toThrow('Noe gikk galt');
    });
});
