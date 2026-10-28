import { apiClient } from '@api/client/apiClient';
import { settAktivBrukerIModiaContext } from '@api/settAktivBrukerIModiaContext';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const personIdent = '12345678910';

describe('settAktivBrukerIModiaContext', () => {
    test('skal sende POST-forespørsel med personIdent', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(undefined);

        await settAktivBrukerIModiaContext(personIdent);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/modia-context/sett-aktiv-bruker',
            data: { personIdent },
        });
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(apiClient.post).mockRejectedValueOnce(feil);

        await expect(settAktivBrukerIModiaContext(personIdent)).rejects.toBe(feil);
    });
});
