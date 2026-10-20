import { apiClient } from '@api/client/apiClient';
import { type KorrigerEtterbetalingPayload, korrigerEtterbetaling } from '@api/korrigerEtterbetaling';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

const payload: KorrigerEtterbetalingPayload = {
    årsak: 'FEIL_TIDLIGERE_UTBETALT_BELØP',
    beløp: 1000,
    begrunnelse: 'En begrunnelse',
};

describe('korrigerEtterbetaling', () => {
    test('skal sende forespørsel om å korrigere etterbetaling', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await korrigerEtterbetaling(payload, behandlingId);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(korrigerEtterbetaling(payload, behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
