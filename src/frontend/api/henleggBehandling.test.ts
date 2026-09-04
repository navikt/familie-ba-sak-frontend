import { apiClient } from '@api/client/apiClient';
import { type HenleggBehandlingPayload, henleggBehandling } from '@api/henleggBehandling';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { HenleggÅrsak } from '@typer/behandling';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: HenleggBehandlingPayload = {
    årsak: HenleggÅrsak.SØKNAD_TRUKKET,
    begrunnelse: 'Begrunnelse for henleggelse',
};

const behandling = lagBehandling();

describe('henleggBehandling', () => {
    test('skal sende forespørsel om å henlegge behandling', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await henleggBehandling(behandling, payload);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/henlegg`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(henleggBehandling(behandling, payload)).rejects.toThrow('Noe gikk galt');
    });
});
