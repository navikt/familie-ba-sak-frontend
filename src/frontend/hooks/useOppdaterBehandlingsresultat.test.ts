import { oppdaterBehandlingsresultat } from '@api/oppdaterBehandlingsresultat';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOppdaterBehandlingsresultat } from './useOppdaterBehandlingsresultat';

vi.mock('@api/oppdaterBehandlingsresultat');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useOppdaterBehandlingsresultat', () => {
    test('kaller oppdaterBehandlingsresultat med riktig behandlingId', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(oppdaterBehandlingsresultat).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterBehandlingsresultat(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ behandlingId: behandling.behandlingId });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterBehandlingsresultat).toHaveBeenCalledWith(expect.any(Function), behandling.behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(oppdaterBehandlingsresultat).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterBehandlingsresultat({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ behandlingId: behandling.behandlingId });

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(
                behandling,
                { behandlingId: behandling.behandlingId },
                undefined,
                expect.any(Object)
            )
        );
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(oppdaterBehandlingsresultat).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterBehandlingsresultat(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ behandlingId: 123 });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
