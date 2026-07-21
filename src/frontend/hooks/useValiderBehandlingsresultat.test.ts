import { validerBehandlingsresultat } from '@api/validerBehandlingsresultat';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useValiderBehandlingsresultat } from './useValiderBehandlingsresultat';

vi.mock('@api/validerBehandlingsresultat');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useValiderBehandlingsresultat', () => {
    test('validerer behandlingsresultatet for behandlingen', async () => {
        // Arrange
        vi.mocked(validerBehandlingsresultat).mockResolvedValue(true);

        // Act
        const { result } = renderHook(() => useValiderBehandlingsresultat(123), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(validerBehandlingsresultat).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(true);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(validerBehandlingsresultat).mockRejectedValue(new Error('Noe gikk galt'));

        // Act
        const { result } = renderHook(() => useValiderBehandlingsresultat(123), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
