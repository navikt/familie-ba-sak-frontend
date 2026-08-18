import { oppdaterBehandlingstema } from '@api/oppdaterBehandlingstema';
import { useOppdaterBehandlingstema } from '@hooks/useOppdaterBehandlingstema';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterBehandlingstema');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const parameters = {
    behandlingKategori: BehandlingKategori.NASJONAL,
    behandlingUnderkategori: BehandlingUnderkategori.ORDINÆR,
    behandlingId: behandling.behandlingId,
};

describe('useOppdaterBehandlingstema', () => {
    test('kaller oppdaterBehandlingstema med riktig payload', async () => {
        // Arrange
        vi.mocked(oppdaterBehandlingstema).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterBehandlingstema(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterBehandlingstema).toHaveBeenCalledWith(
            {
                behandlingKategori: parameters.behandlingKategori,
                behandlingUnderkategori: parameters.behandlingUnderkategori,
            },
            parameters.behandlingId
        );
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(oppdaterBehandlingstema).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterBehandlingstema({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom oppdaterBehandlingstema feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(oppdaterBehandlingstema).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useOppdaterBehandlingstema(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
