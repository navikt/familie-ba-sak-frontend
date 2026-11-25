import { apiClient } from '@api/client/apiClient';
import { oppdaterEndretUtbetalingAndel } from '@api/oppdaterEndretUtbetalingAndel';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { IEndretUtbetalingAndelÅrsak, type IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { put: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling({ behandlingId: 123 });

const endretUtbetalingAndel: IRestEndretUtbetalingAndel = {
    id: 456,
    personIdenter: ['12345678910'],
    prosent: 0,
    fom: '2024-01',
    tom: '2024-12',
    begrunnelse: 'Begrunnelse',
    årsak: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
};

describe('oppdaterEndretUtbetalingAndel', () => {
    test('skal sende PUT med endret utbetalingsandel til riktig URL og returnere behandlingen', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await oppdaterEndretUtbetalingAndel(behandling.behandlingId, endretUtbetalingAndel);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/endretutbetalingandel/123/456',
            data: endretUtbetalingAndel,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.put).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(oppdaterEndretUtbetalingAndel(behandling.behandlingId, endretUtbetalingAndel)).rejects.toThrow(
            'Noe gikk galt'
        );
    });
});
