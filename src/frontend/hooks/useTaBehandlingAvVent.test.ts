import { taBehandlingAvVent } from '@api/taBehandlingAvVent';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useTaBehandlingAvVent } from './useTaBehandlingAvVent';

vi.mock('@api/taBehandlingAvVent');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useTaBehandlingAvVent', () => {
    test('kaller taBehandlingAvVent med riktig behandlingId', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(taBehandlingAvVent).mockResolvedValue(behandling);

        const { result } = renderHook(() => useTaBehandlingAvVent(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandling.behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(taBehandlingAvVent).toHaveBeenCalledWith(behandling.behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(taBehandlingAvVent).mockResolvedValue(behandling);

        const { result } = renderHook(() => useTaBehandlingAvVent({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandling.behandlingId);

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(behandling, behandling.behandlingId, undefined, expect.any(Object))
        );
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(taBehandlingAvVent).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useTaBehandlingAvVent(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(123);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
