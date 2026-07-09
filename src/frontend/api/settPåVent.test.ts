import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { settPåVent, type SettPåVentPayload } from './settPåVent';
import { SettPåVentÅrsak } from '../typer/behandling';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { request: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('settPåVent', () => {
    const payload: SettPåVentPayload = {
        frist: '2025-10-10',
        årsak: SettPåVentÅrsak.AVVENTER_DOKUMENTASJON,
    };

    test('kaller POST når behandlingen ikke allerede er på vent', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.request).mockResolvedValue(behandling);

        // Act
        const result = await settPåVent(payload, behandling.behandlingId, false);

        // Assert
        expect(apiClient.request).toHaveBeenCalledWith({
            method: 'POST',
            data: payload,
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
        });
        expect(result).toEqual(behandling);
    });

    test('kaller PUT når behandlingen allerede er på vent', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(apiClient.request).mockResolvedValue(behandling);

        // Act
        const result = await settPåVent(payload, behandling.behandlingId, true);

        // Assert
        expect(apiClient.request).toHaveBeenCalledWith({
            method: 'PUT',
            data: payload,
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
        });
        expect(result).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.request).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(settPåVent(payload, 123, false)).rejects.toThrow();
    });
});
