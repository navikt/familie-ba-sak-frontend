import { leggTilSmåbarnstillegg } from '@api/leggTilSmåbarnstillegg';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useLeggTilSmåbarnstillegg } from './useLeggTilSmåbarnstillegg';

vi.mock('@api/leggTilSmåbarnstillegg');

afterEach(() => {
    vi.clearAllMocks();
});

const parameters = { behandlingId: 123, årMåned: '2025-01' };

describe('useLeggTilSmåbarnstillegg', () => {
    test('kaller leggTilSmåbarnstillegg med riktig payload og behandlingId', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(leggTilSmåbarnstillegg).mockResolvedValue(behandling);

        const { result } = renderHook(() => useLeggTilSmåbarnstillegg(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(leggTilSmåbarnstillegg).toHaveBeenCalledWith({ årMåned: parameters.årMåned }, parameters.behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(leggTilSmåbarnstillegg).mockResolvedValue(behandling);

        const { result } = renderHook(() => useLeggTilSmåbarnstillegg({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object))
        );
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(leggTilSmåbarnstillegg).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useLeggTilSmåbarnstillegg(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
