import { hentAlleBegrunnelser } from '@api/hentAlleBegrunnelser';
import { useHentAlleBegrunnelser } from '@hooks/useHentAlleBegrunnelser';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { AlleBegrunnelser } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/hentAlleBegrunnelser');

afterEach(() => {
    vi.clearAllMocks();
});

const alleBegrunnelser = {} as AlleBegrunnelser;

describe('useHentAlleBegrunnelser', () => {
    test('henter alle begrunnelser', async () => {
        // Arrange
        vi.mocked(hentAlleBegrunnelser).mockResolvedValue(alleBegrunnelser);

        // Act
        const { result } = renderHook(() => useHentAlleBegrunnelser(), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentAlleBegrunnelser).toHaveBeenCalledWith();
        expect(result.current.data).toEqual(alleBegrunnelser);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(hentAlleBegrunnelser).mockRejectedValue(new Error('Noe gikk galt'));

        // Act
        const { result } = renderHook(() => useHentAlleBegrunnelser(), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
