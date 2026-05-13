import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { oppdaterVilkårsvurdering } from './oppdaterVilkårsvurdering';

afterEach(() => {
    vi.clearAllMocks();
});

describe('oppdaterVilkårsvurdering', () => {
    test('kaller request med riktig metode og URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        // Act
        const result = await oppdaterVilkårsvurdering(mockRequest, behandling.behandlingId);

        // Assert
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/vilkårsvurdering`,
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
        await expect(oppdaterVilkårsvurdering(mockRequest, 123)).rejects.toThrow();
    });
});
