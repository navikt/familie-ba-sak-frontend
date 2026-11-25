import { apiClient } from '@api/client/apiClient';
import { type OppdaterRefusjonEøsPayload, oppdaterRefusjonEøs } from '@api/oppdaterRefusjonEøs';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OppdaterRefusjonEøsPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    refusjonsbeløp: 1000,
    land: 'SE',
    refusjonAvklart: false,
};

const behandling = lagBehandling({ behandlingId: 123 });

describe('oppdaterRefusjonEøs', () => {
    test('skal sende forespørsel om å oppdatere refusjon EØS', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await oppdaterRefusjonEøs(123, 5, payload);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/refusjon-eøs/behandlinger/123/perioder/5',
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(oppdaterRefusjonEøs(123, 5, payload)).rejects.toThrow('Noe gikk galt');
    });
});
