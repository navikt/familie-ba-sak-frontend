import { hentPersonerMedUgyldigEtterbetalingsperiode } from '@api/hentPersonerMedUgyldigEtterbetalingsperiode';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentPersonerMedUgyldigEtterbetalingsperiode } from './useHentPersonerMedUgyldigEtterbetalingsperiode';

vi.mock('@api/hentPersonerMedUgyldigEtterbetalingsperiode');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentPersonerMedUgyldigEtterbetalingsperiode', () => {
    test('henter personer med ugyldig etterbetalingsperiode for behandlingen', async () => {
        // Arrange
        const personer = ['12345678901'];
        vi.mocked(hentPersonerMedUgyldigEtterbetalingsperiode).mockResolvedValue(personer);

        // Act
        const { result } = renderHook(() => useHentPersonerMedUgyldigEtterbetalingsperiode(123), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentPersonerMedUgyldigEtterbetalingsperiode).toHaveBeenCalledWith(123);
        expect(result.current.data).toEqual(personer);
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(hentPersonerMedUgyldigEtterbetalingsperiode).mockRejectedValue(new Error('Noe gikk galt'));

        // Act
        const { result } = renderHook(() => useHentPersonerMedUgyldigEtterbetalingsperiode(123), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
