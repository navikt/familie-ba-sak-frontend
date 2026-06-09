import { Distribusjonskanal } from '@typer/dokument';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { hentDistribusjonskanal } from './hentDistribusjonskanal';

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentDistribusjonskanal', () => {
    test('kaller request med riktig metode, URL og ident', async () => {
        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: Distribusjonskanal.DITT_NAV,
        });

        const result = await hentDistribusjonskanal(mockRequest, '12345678903');

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            data: { ident: '12345678903' },
            url: '/familie-ba-sak/api/dokument/distribusjonskanal',
        });
        expect(result).toBe(Distribusjonskanal.DITT_NAV);
    });

    test('kaster feil ved FEILET-status', async () => {
        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.FEILET,
            frontendFeilmelding: 'Noe gikk galt',
        });

        await expect(hentDistribusjonskanal(mockRequest, '12345678903')).rejects.toThrow();
    });
});
