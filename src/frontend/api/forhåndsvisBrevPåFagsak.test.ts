import { apiClient } from '@api/client/apiClient';
import { Informasjonsbrev } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { forhåndsvisBrevPåFagsak } from './forhåndsvisBrevPåFagsak';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: Målform.NB,
    brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
    manuelleBrevmottakere: [],
};

describe('forhåndsvisBrevPåFagsak', () => {
    test('kaller apiClient.post med riktig URL og data', async () => {
        vi.mocked(apiClient.post).mockResolvedValue('base64-pdf-innhold');

        const result = await forhåndsvisBrevPåFagsak(1, payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/dokument/fagsak/1/forhaandsvis-brev',
            data: payload,
        });
        expect(result).toBe('base64-pdf-innhold');
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(forhåndsvisBrevPåFagsak(1, payload)).rejects.toThrow('Noe gikk galt');
    });
});
