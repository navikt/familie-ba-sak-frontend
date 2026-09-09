import { apiClient } from '@api/client/apiClient';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { sendBehandlingBrev } from './sendBehandlingBrev';

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
    brevmal: Brevmal.INNHENTE_OPPLYSNINGER,
};

describe('sendBehandlingBrev', () => {
    test('kaller apiClient.post med riktig URL og data', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(undefined);

        await sendBehandlingBrev(1, payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/dokument/send-brev/1',
            data: payload,
        });
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(sendBehandlingBrev(1, payload)).rejects.toThrow('Noe gikk galt');
    });
});
