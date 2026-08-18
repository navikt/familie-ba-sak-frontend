import { apiClient } from '@api/client/apiClient';
import { oppdaterBehandlingstema, type OppdaterBehandlingstemaPayload } from '@api/oppdaterBehandlingstema';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OppdaterBehandlingstemaPayload = {
    behandlingKategori: BehandlingKategori.NASJONAL,
    behandlingUnderkategori: BehandlingUnderkategori.ORDINÆR,
};

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('oppdaterBehandlingstema', () => {
    test('skal sende forespørsel om å oppdatere behandlingstema', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce(behandling);

        const svar = await oppdaterBehandlingstema(payload, behandlingId);

        expect(apiClient.put).toHaveBeenCalledTimes(1);
        expect(apiClient.put).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.put).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(oppdaterBehandlingstema(payload, behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
