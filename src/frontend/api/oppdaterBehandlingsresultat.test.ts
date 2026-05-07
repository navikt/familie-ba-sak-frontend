import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { oppdaterBehandlingsresultat } from './oppdaterBehandlingsresultat';

afterEach(() => {
    vi.clearAllMocks();
});

describe('oppdaterBehandlingsresultat', () => {
    test('kaller request med riktig metode og URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        // Act
        const result = await oppdaterBehandlingsresultat(mockRequest, behandling.behandlingId);

        // Assert
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/behandlingsresultat`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.FEILET,
            frontendFeilmelding: 'Noe gikk galt',
        });

        // Act & assert
        await expect(oppdaterBehandlingsresultat(mockRequest, 123)).rejects.toThrow();
    });
});
