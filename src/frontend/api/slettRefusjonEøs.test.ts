import { apiClient } from '@api/client/apiClient';
import { slettRefusjonEøs } from '@api/slettRefusjonEøs';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

describe('slettRefusjonEøs', () => {
    test('skal sende forespørsel om å slette refusjon EØS', async () => {
        vi.mocked(apiClient.delete).mockResolvedValueOnce(behandling);

        const svar = await slettRefusjonEøs(123, 5);

        expect(apiClient.delete).toHaveBeenCalledTimes(1);
        expect(apiClient.delete).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/refusjon-eøs/behandlinger/123/perioder/5',
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.delete).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(slettRefusjonEøs(123, 5)).rejects.toThrow('Noe gikk galt');
    });
});
