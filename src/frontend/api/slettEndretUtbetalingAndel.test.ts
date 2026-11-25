import { apiClient } from '@api/client/apiClient';
import { slettEndretUtbetalingAndel } from '@api/slettEndretUtbetalingAndel';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { delete: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

const endretUtbetalingAndel: IRestEndretUtbetalingAndel = {
    id: 456,
    personIdenter: ['12345678910'],
};

describe('slettEndretUtbetalingAndel', () => {
    test('skal sende DELETE til riktig URL og returnere behandlingen', async () => {
        vi.mocked(apiClient.delete).mockResolvedValueOnce(behandling);

        const svar = await slettEndretUtbetalingAndel(behandling.behandlingId, endretUtbetalingAndel);

        expect(apiClient.delete).toHaveBeenCalledTimes(1);
        expect(apiClient.delete).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/endretutbetalingandel/123/456',
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.delete).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(slettEndretUtbetalingAndel(behandling.behandlingId, endretUtbetalingAndel)).rejects.toThrow(
            'Noe gikk galt'
        );
    });
});
