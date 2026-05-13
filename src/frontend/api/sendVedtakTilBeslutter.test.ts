import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { sendVedtakTilBeslutter } from './sendVedtakTilBeslutter';

afterEach(() => {
    vi.clearAllMocks();
});

describe('sendVedtakTilBeslutter', () => {
    test('kaller request med riktig metode og URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        const parameters = {
            behandlingId: behandling.behandlingId,
            behandlendeEnhet: '4820',
        };

        // Act
        const result = await sendVedtakTilBeslutter(mockRequest, parameters);

        // Assert
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            url: `/familie-ba-sak/api/behandlinger/${parameters.behandlingId}/steg/send-til-beslutter?behandlendeEnhet=${parameters.behandlendeEnhet}`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.FEILET,
            frontendFeilmelding: 'Noe gikk galt',
        });

        const parameters = {
            behandlingId: 123,
            behandlendeEnhet: '4820',
        };

        // Act & assert
        await expect(sendVedtakTilBeslutter(mockRequest, parameters)).rejects.toThrow();
    });
});
