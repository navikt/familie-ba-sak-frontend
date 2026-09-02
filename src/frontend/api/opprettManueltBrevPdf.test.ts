import { apiClient } from '@api/client/apiClient';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { opprettManueltBrevPdf } from './opprettManueltBrevPdf';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: IManueltBrevRequestPåBehandling = {
    multiselectVerdier: [],
    brevmal: Brevmal.HENLEGGE_TRUKKET_SØKNAD,
    barnIBrev: [],
};

describe('opprettManueltBrevPdf', () => {
    test('kaller apiClient.post med riktig URL og data', async () => {
        vi.mocked(apiClient.post).mockResolvedValue('base64-pdf-innhold');

        const result = await opprettManueltBrevPdf({ behandlingId: 1 }, payload);

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/dokument/forhaandsvis-brev/1',
            data: payload,
        });
        expect(result).toBe('base64-pdf-innhold');
    });

    test('kaster feil ved avvist promise', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(opprettManueltBrevPdf({ behandlingId: 1 }, payload)).rejects.toThrow('Noe gikk galt');
    });
});
