import { leggTilBarnPåBehandling } from '@api/leggTilBarnPåBehandling';
import { useLeggTilBarnPåBehandling } from '@hooks/useLeggTilBarnPåBehandling';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/leggTilBarnPåBehandling');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const parameters = {
    barnIdent: '15522483319',
    behandlingId: behandling.behandlingId,
};

describe('useLeggTilBarnPåBehandling', () => {
    test('kaller leggTilBarnPåBehandling med riktig payload', async () => {
        // Arrange
        vi.mocked(leggTilBarnPåBehandling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useLeggTilBarnPåBehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(leggTilBarnPåBehandling).toHaveBeenCalledWith(
            { barnIdent: parameters.barnIdent },
            parameters.behandlingId
        );
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(leggTilBarnPåBehandling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useLeggTilBarnPåBehandling({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom leggTilBarnPåBehandling feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(leggTilBarnPåBehandling).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useLeggTilBarnPåBehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
