import { apiClient } from '@api/client/apiClient';
import { Informasjonsbrev } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { sendInformasjonsbrev } from './sendInformasjonsbrev';

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

describe('sendInformasjonsbrev', () => {
    test('kaller apiClient.post med riktig URL og data', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(undefined);

        await sendInformasjonsbrev(1, payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/dokument/fagsak/1/send-brev',
            data: payload,
        });
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(sendInformasjonsbrev(1, payload)).rejects.toThrow('Noe gikk galt');
    });
});
