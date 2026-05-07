import { oppdaterVilkårsvurdering } from '@api/oppdaterVilkårsvurdering';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOppdaterVilkårsvurdering } from './useOppdaterVilkårsvurdering';

vi.mock('@api/oppdaterVilkårsvurdering');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useOppdaterVilkårsvurdering', () => {
    test('kaller oppdaterVilkårsvurdering med riktig behandlingId', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(oppdaterVilkårsvurdering).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterVilkårsvurdering(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ behandlingId: behandling.behandlingId });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterVilkårsvurdering).toHaveBeenCalledWith(expect.any(Function), behandling.behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(oppdaterVilkårsvurdering).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterVilkårsvurdering({ onSuccess }), {
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
        vi.mocked(oppdaterVilkårsvurdering).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterVilkårsvurdering(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ behandlingId: 123 });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
