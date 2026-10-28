import { apiClient } from '@api/client/apiClient';
import { oppdaterRegisteropplysninger } from '@api/oppdaterRegisteropplysninger';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('oppdaterRegisteropplysninger', () => {
    test('skal hente oppdaterte registeropplysninger og returnere behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(behandling);

        const svar = await oppdaterRegisteropplysninger(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/person/oppdater-registeropplysninger/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Kunne ikke oppdatere registeropplysninger');
        vi.mocked(apiClient.get).mockRejectedValueOnce(feil);

        await expect(oppdaterRegisteropplysninger(behandlingId)).rejects.toBe(feil);
    });
});
