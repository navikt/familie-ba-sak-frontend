import { slettVilkår } from '@api/slettVilkår';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { VilkårType } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSlettVilkår } from './useSlettVilkår';

vi.mock('@api/slettVilkår');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useSlettVilkår', () => {
    test('kaller slettVilkår med behandlingId og payload', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(slettVilkår).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSlettVilkår(), { wrapper: TestProviders });

        // Act
        result.current.mutate({
            behandlingId: 123,
            personIdent: '12345678910',
            vilkårType: VilkårType.UTVIDET_BARNETRYGD,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(slettVilkår).toHaveBeenCalledWith(123, {
            personIdent: '12345678910',
            vilkårType: VilkårType.UTVIDET_BARNETRYGD,
        });
        expect(result.current.data).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(slettVilkår).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSlettVilkår(), { wrapper: TestProviders });

        // Act
        result.current.mutate({
            behandlingId: 123,
            personIdent: '12345678910',
            vilkårType: VilkårType.UTVIDET_BARNETRYGD,
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
