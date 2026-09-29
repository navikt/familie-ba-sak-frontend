import { fyllUtVilkårsvurderingITestmiljø } from '@api/fyllUtVilkårsvurderingITestmiljø';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useFyllUtVilkårsvurderingITestmiljø } from './useFyllUtVilkårsvurderingITestmiljø';

vi.mock('@api/fyllUtVilkårsvurderingITestmiljø');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useFyllUtVilkårsvurderingITestmiljø', () => {
    test('kaller fyllUtVilkårsvurderingITestmiljø med behandlingId', async () => {
        // Arrange
        vi.mocked(fyllUtVilkårsvurderingITestmiljø).mockResolvedValue('OK');

        const { result } = renderHook(() => useFyllUtVilkårsvurderingITestmiljø(), { wrapper: TestProviders });

        // Act
        result.current.mutate({ behandlingId: 123 });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fyllUtVilkårsvurderingITestmiljø).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe('OK');
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(fyllUtVilkårsvurderingITestmiljø).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useFyllUtVilkårsvurderingITestmiljø(), { wrapper: TestProviders });

        // Act
        result.current.mutate({ behandlingId: 123 });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
