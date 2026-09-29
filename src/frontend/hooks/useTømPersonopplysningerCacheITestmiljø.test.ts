import { tømPersonopplysningerCacheITestmiljø } from '@api/tømPersonopplysningerCacheITestmiljø';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useTømPersonopplysningerCacheITestmiljø } from './useTømPersonopplysningerCacheITestmiljø';

vi.mock('@api/tømPersonopplysningerCacheITestmiljø');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useTømPersonopplysningerCacheITestmiljø', () => {
    test('kaller tømPersonopplysningerCacheITestmiljø', async () => {
        // Arrange
        vi.mocked(tømPersonopplysningerCacheITestmiljø).mockResolvedValue('OK');

        const { result } = renderHook(() => useTømPersonopplysningerCacheITestmiljø(), { wrapper: TestProviders });

        // Act
        result.current.mutate();

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(tømPersonopplysningerCacheITestmiljø).toHaveBeenCalledTimes(1);
        expect(result.current.data).toBe('OK');
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(tømPersonopplysningerCacheITestmiljø).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useTømPersonopplysningerCacheITestmiljø(), { wrapper: TestProviders });

        // Act
        result.current.mutate();

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
