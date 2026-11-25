import { apiClient } from '@api/client/apiClient';
import { hentPerson } from '@api/hentPerson';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { Adressebeskyttelsegradering } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentPerson', () => {
    test('skal kalle apiClient.post med riktig URL og payload', async () => {
        const payload = { ident: '12345678903' };
        const person = lagPerson();
        vi.mocked(apiClient.post).mockResolvedValue(person);

        const result = await hentPerson(payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/person',
            data: payload,
        });
        expect(result).toBe(person);
    });

    test('skal kaste tilgangsfeil med diskresjonskode når saksbehandler ikke har tilgang', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(
            lagPerson({
                harTilgang: false,
                adressebeskyttelseGradering: Adressebeskyttelsegradering.STRENGT_FORTROLIG,
            })
        );

        await expect(hentPerson({ ident: '12345678903' })).rejects.toThrow(
            'Du har ikke tilgang til denne personen. Personen har diskresjonskode strengt fortrolig.'
        );
    });

    test('skal kaste feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentPerson({ ident: '12345678903' })).rejects.toThrow('Noe gikk galt');
    });
});
