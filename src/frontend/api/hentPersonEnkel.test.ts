import { apiClient } from '@api/client/apiClient';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { Adressebeskyttelsegradering } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { hentPersonEnkel } from './hentPersonEnkel';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentPersonEnkel', () => {
    test('kaller apiClient.post med riktig URL og payload', async () => {
        const payload = { ident: '12345678903' };
        const person = lagPerson();
        vi.mocked(apiClient.post).mockResolvedValue(person);

        const result = await hentPersonEnkel(payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/person/enkel',
            data: payload,
        });
        expect(result).toBe(person);
    });

    test('kaster en tilgangsfeil med diskresjonskode når brukeren ikke har tilgang', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(
            lagPerson({
                harTilgang: false,
                adressebeskyttelseGradering: Adressebeskyttelsegradering.STRENGT_FORTROLIG,
            })
        );

        await expect(hentPersonEnkel({ ident: '12345678903' })).rejects.toThrow(
            'Du har ikke tilgang til denne personen. Personen har diskresjonskode strengt fortrolig.'
        );
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentPersonEnkel({ ident: '12345678903' })).rejects.toThrow('Noe gikk galt');
    });
});
