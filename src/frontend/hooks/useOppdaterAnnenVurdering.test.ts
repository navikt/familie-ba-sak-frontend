import { oppdaterAnnenVurdering } from '@api/oppdaterAnnenVurdering';
import { renderHook, waitFor } from '@testing-library/react';
import { lagAnnenVurdering } from '@testutils/testdata/annenVurderingTestdata';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { Resultat } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOppdaterAnnenVurdering } from './useOppdaterAnnenVurdering';

vi.mock('@api/oppdaterAnnenVurdering');

afterEach(() => {
    vi.clearAllMocks();
});

const annenVurdering = lagAnnenVurdering({ id: 5, behandlingId: 123, resultat: Resultat.OPPFYLT });

describe('useOppdaterAnnenVurdering', () => {
    test('kaller oppdaterAnnenVurdering med id fra annen vurdering', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(oppdaterAnnenVurdering).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterAnnenVurdering(), { wrapper: TestProviders });

        // Act
        result.current.mutate({ behandlingId: 123, annenVurdering });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterAnnenVurdering).toHaveBeenCalledWith({ behandlingId: 123, annenVurderingId: 5 }, annenVurdering);
        expect(result.current.data).toEqual(behandling);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(oppdaterAnnenVurdering).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterAnnenVurdering(), { wrapper: TestProviders });

        // Act
        result.current.mutate({ behandlingId: 123, annenVurdering });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
