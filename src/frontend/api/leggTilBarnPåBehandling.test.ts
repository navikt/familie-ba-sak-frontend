import { apiClient } from '@api/client/apiClient';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';

import { leggTilBarnPåBehandling } from './leggTilBarnPåBehandling';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    barnIdent: 'Z123456',
};

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('leggTilBarnPåBehandling', () => {
    test('skal sende forespørsel om å legge til barn på behandling', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await leggTilBarnPåBehandling(payload, behandlingId);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/legg-til-barn`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(leggTilBarnPåBehandling(payload, behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
