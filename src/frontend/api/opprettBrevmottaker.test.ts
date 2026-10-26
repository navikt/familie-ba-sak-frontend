import { apiClient } from '@api/client/apiClient';
import { type OpprettBrevmottakerPayload, opprettBrevmottaker } from '@api/opprettBrevmottaker';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottaker } from '@testutils/testdata/brevmottakerTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OpprettBrevmottakerPayload = lagBrevmottaker();

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('opprettBrevmottaker', () => {
    test('skal sende forespørsel om å opprette brevmottaker', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await opprettBrevmottaker({ behandlingId }, payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(opprettBrevmottaker({ behandlingId }, payload)).rejects.toThrow('Noe gikk galt');
    });
});
