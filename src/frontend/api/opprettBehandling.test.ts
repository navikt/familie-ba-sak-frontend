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
    test('skal sende forespørsel om opprettelse av behandling ved førstegangsbehandling', async () => {
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
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.ORDINÆR,
            type: Behandlingstype.FØRSTEGANGSBEHANDLING,
            årsak: BehandlingÅrsak.SØKNAD,
            endretAv: 'Z123456',
            migreringsdato: undefined,
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

    test('skal sende forespørsel om opprettelse av behandling ved migrering fra Infotrygd', async () => {
        const payload = {
            behandlingType: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
            behandlingÅrsak: BehandlingÅrsak.HELMANUELL_MIGRERING,
            fagsakId: 123,
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.UTVIDET,
            navIdent: 'Z123456',
            nyMigreringsdato: '2023-01-01',
            barnasIdenter: ['15522483319'],
        };
        const behandling = lagBehandling({
            type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
            årsak: BehandlingÅrsak.HELMANUELL_MIGRERING,
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.UTVIDET,
            endretAv: 'Z123456',
            migreringsdato: '2023-01-02',
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

    test('skal sende forespørsel om opprettelse av behandling ved teknisk endring', async () => {
        const payload = {
            behandlingType: Behandlingstype.TEKNISK_ENDRING,
            behandlingÅrsak: BehandlingÅrsak.TEKNISK_ENDRING,
            fagsakId: 123,
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.UTVIDET,
            navIdent: 'Z123456',
        };
        const behandling = lagBehandling({
            type: Behandlingstype.TEKNISK_ENDRING,
            årsak: BehandlingÅrsak.TEKNISK_ENDRING,
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.UTVIDET,
            endretAv: 'Z123456',
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
