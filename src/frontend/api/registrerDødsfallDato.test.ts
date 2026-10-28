import { apiClient } from '@api/client/apiClient';
import { type RegistrerDødsfallDatoPayload, registrerDødsfall } from '@api/registrerDødsfallDato';
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

const payload: RegistrerDødsfallDatoPayload = {
    dødsfallDato: '2026-01-15',
    begrunnelse: 'Begrunnelse',
    personIdent: '12345678910',
};

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('registrerDødsfall', () => {
    test('skal sende POST-forespørsel med payload og returnere behandlingen', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await registrerDødsfall(payload, behandlingId);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/person/registrer-manuell-dodsfall/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(apiClient.post).mockRejectedValueOnce(feil);

        await expect(registrerDødsfall(payload, behandlingId)).rejects.toBe(feil);
    });
});
