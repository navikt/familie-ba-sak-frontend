import { apiClient } from '@api/client/apiClient';
import { slettBrevmottaker } from '@api/slettBrevmottaker';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const brevmottakere = [lagBrevmottakerBehandling()];
const behandlingId = behandling.behandlingId;
const brevmottakerId = 456;

describe('slettBrevmottaker', () => {
    test('skal sende forespørsel om å slette brevmottaker', async () => {
        vi.mocked(apiClient.delete).mockResolvedValueOnce(brevmottakere);

        const svar = await slettBrevmottaker({ behandlingId, brevmottakerId });

        expect(apiClient.delete).toHaveBeenCalledTimes(1);
        expect(apiClient.delete).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/brevmottaker/${behandlingId}/${brevmottakerId}`,
        });
        expect(svar).toEqual(brevmottakere);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.delete).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(slettBrevmottaker({ behandlingId, brevmottakerId })).rejects.toThrow('Noe gikk galt');
    });
});
