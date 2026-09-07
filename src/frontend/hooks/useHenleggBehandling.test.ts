import { henleggBehandling } from '@api/henleggBehandling';
import { useHenleggBehandling } from '@hooks/useHenleggBehandling';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { HenleggÅrsak } from '@typer/behandling';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/henleggBehandling');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const parameters = {
    behandling,
    årsak: HenleggÅrsak.SØKNAD_TRUKKET,
    begrunnelse: 'Begrunnelse for henleggelse',
};

describe('useHenleggBehandling', () => {
    test('kaller henleggBehandling med riktig payload', async () => {
        // Arrange
        vi.mocked(henleggBehandling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useHenleggBehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(henleggBehandling).toHaveBeenCalledWith(behandling, {
            årsak: parameters.årsak,
            begrunnelse: parameters.begrunnelse,
        });
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(henleggBehandling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useHenleggBehandling({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom henleggBehandling feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(henleggBehandling).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useHenleggBehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
