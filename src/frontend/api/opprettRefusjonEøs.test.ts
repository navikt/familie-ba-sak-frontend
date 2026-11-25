import { apiClient } from '@api/client/apiClient';
import { type OpprettRefusjonEøsPayload, opprettRefusjonEøs } from '@api/opprettRefusjonEøs';
import { lagRefusjonEøs } from '@testutils/testdata/refusjonEøsTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OpprettRefusjonEøsPayload = {
    fom: '2024-01-01',
    tom: '2024-06-30',
    refusjonsbeløp: 1000,
    land: 'SE',
    refusjonAvklart: true,
};

const refusjonEøsPerioder = [lagRefusjonEøs()];

describe('opprettRefusjonEøs', () => {
    test('skal sende forespørsel om å opprette refusjon EØS', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(refusjonEøsPerioder);

        const svar = await opprettRefusjonEøs(123, payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/refusjon-eøs/behandlinger/123',
        });
        expect(svar).toEqual(refusjonEøsPerioder);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(opprettRefusjonEøs(123, payload)).rejects.toThrow('Noe gikk galt');
    });
});
