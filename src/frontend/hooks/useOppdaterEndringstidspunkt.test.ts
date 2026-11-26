import { oppdaterEndringstidspunkt } from '@api/oppdaterEndringstidspunkt';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOppdaterEndringstidspunkt } from './useOppdaterEndringstidspunkt';

vi.mock('@api/oppdaterEndringstidspunkt');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useOppdaterEndringstidspunkt', () => {
    test('kaller oppdaterEndringstidspunkt med endringstidspunkt og behandlingId', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(oppdaterEndringstidspunkt).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterEndringstidspunkt(123), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ endringstidspunkt: '2024-01-01' });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterEndringstidspunkt).toHaveBeenCalledWith('2024-01-01', 123);
        expect(result.current.data).toEqual(behandling);
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(oppdaterEndringstidspunkt).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterEndringstidspunkt(123, { onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ endringstidspunkt: '2024-01-01' });

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(
                behandling,
                { endringstidspunkt: '2024-01-01' },
                undefined,
                expect.any(Object)
            )
        );
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(oppdaterEndringstidspunkt).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterEndringstidspunkt(123), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ endringstidspunkt: '2024-01-01' });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
