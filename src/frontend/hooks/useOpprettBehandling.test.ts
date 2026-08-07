import { opprettBehandling } from '@api/opprettBehandling';
import { useOpprettBehandling } from '@hooks/useOpprettBehandling';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/opprettBehandling');

afterEach(() => {
    vi.clearAllMocks();
});

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

describe('useOpprettBehandling', () => {
    test('kaller opprettBehandling med riktig payload', async () => {
        // Arrange
        vi.mocked(opprettBehandling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettBehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettBehandling).toHaveBeenCalledWith(payload);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettBehandling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOpprettBehandling({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, payload, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettKlagebehandling feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(opprettBehandling).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useOpprettBehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
