import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { settPåVent, type SettPåVentPayload } from './settPåVent';
import { SettPåVentÅrsak } from '../typer/behandling';

afterEach(() => {
    vi.clearAllMocks();
});

describe('settPåVent', () => {
    const payload: SettPåVentPayload = {
        frist: '2025-10-10',
        årsak: SettPåVentÅrsak.AVVENTER_DOKUMENTASJON,
    };

    test('kaller request med POST når behandlingen ikke allerede er på vent', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        // Act
        const result = await settPåVent(mockRequest, payload, behandling.behandlingId, false);

        // Assert
        expect(mockRequest).toHaveBeenCalledWith({
            data: payload,
            method: 'POST',
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
        });
        expect(result).toEqual(behandling);
    });

    test('kaller request med PUT når behandlingen allerede er på vent', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });

        const mockRequest = vi.fn().mockResolvedValue({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        // Act
        const result = await settPåVent(mockRequest, payload, behandling.behandlingId, true);

        // Assert
        expect(mockRequest).toHaveBeenCalledWith({
            data: payload,
            method: 'PUT',
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
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
        await expect(settPåVent(mockRequest, payload, 123, false)).rejects.toThrow();
    });
});
