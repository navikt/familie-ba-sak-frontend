import { Informasjonsbrev } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { forhåndsvisBrevPåFagsak } from './forhåndsvisBrevPåFagsak';

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
    test('kaller request med riktig metode, URL og data', async () => {
        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: 'base64-pdf-innhold',
        });

        const result = await forhåndsvisBrevPåFagsak(mockRequest, 1, payload);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            data: payload,
            url: '/familie-ba-sak/api/dokument/fagsak/1/forhaandsvis-brev',
            påvirkerSystemLaster: false,
        });
        expect(result).toBe('base64-pdf-innhold');
    });

    test('kaster feil ved FEILET-status', async () => {
        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.FEILET,
            frontendFeilmelding: 'Noe gikk galt',
        });

        await expect(forhåndsvisBrevPåFagsak(mockRequest, 1, payload)).rejects.toThrow();
    });
});
