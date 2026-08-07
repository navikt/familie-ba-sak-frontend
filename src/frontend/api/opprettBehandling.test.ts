import { apiClient } from '@api/client/apiClient';
import { opprettBehandling } from '@api/opprettBehandling';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('opprettBehandling', () => {
    test('skal sende forespørsel om opprettelse av behandling', async () => {
        const payload = {
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.ORDINÆR,
            behandlingType: Behandlingstype.FØRSTEGANGSBEHANDLING,
            behandlingÅrsak: BehandlingÅrsak.SØKNAD,
            navIdent: 'Z123456',
            nyMigreringsdato: undefined,
            søknadMottattDato: '2026-08-04',
            barnasIdenter: undefined,
            fagsakId: 123,
            begrunnelse: undefined,
        };

        const behandling = lagBehandling({
            kategori: payload.kategori,
            underkategori: payload.underkategori,
            type: payload.behandlingType,
            årsak: payload.behandlingÅrsak,
            endretAv: payload.navIdent,
            søknadMottattDato: '2026-08-04T00:00:00',
        });

        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await opprettBehandling(payload);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: '/familie-ba-sak/api/behandlinger',
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        const payload = {
            kategori: null,
            underkategori: null,
            behandlingType: Behandlingstype.FØRSTEGANGSBEHANDLING,
            navIdent: 'Z123456',
            fagsakId: 123,
        };

        await expect(opprettBehandling(payload)).rejects.toThrow('Noe gikk galt');
    });
});
