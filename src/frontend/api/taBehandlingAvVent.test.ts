import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { taBehandlingAvVent } from './taBehandlingAvVent';

afterEach(() => {
    vi.clearAllMocks();
});

describe('taBehandlingAvVent', () => {
    test('kaller request med riktig metode og URL, og får forventet resultat', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        // Act
        const result = await taBehandlingAvVent(mockRequest, behandling.behandlingId);

        // Assert
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'PUT',
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}/fortsettbehandling`,
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
        await expect(taBehandlingAvVent(mockRequest, 123)).rejects.toThrow();
    });
});
