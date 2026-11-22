import { korrigerVedtak } from '@api/korrigerVedtak';
import { useKorrigerVedtak } from '@hooks/useKorrigerVedtak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagKorrigertVedtak } from '@testutils/testdata/korrigertVedtakTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/korrigerVedtak');

afterEach(() => {
    vi.clearAllMocks();
});

const korrigertVedtak = lagKorrigertVedtak();

const parameters = {
    vedtaksdato: '2024-01-01',
    begrunnelse: 'Begrunnelse for korrigering',
    behandlingId: 1,
};

describe('useKorrigerVedtak', () => {
    test('kaller korrigerVedtak med riktig payload', async () => {
        // Arrange
        vi.mocked(korrigerVedtak).mockResolvedValue(korrigertVedtak);

        const { result } = renderHook(() => useKorrigerVedtak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(korrigerVedtak).toHaveBeenCalledWith(
            { vedtaksdato: parameters.vedtaksdato, begrunnelse: parameters.begrunnelse },
            parameters.behandlingId
        );
        expect(result.current.data).toEqual(korrigertVedtak);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(korrigerVedtak).mockResolvedValue(korrigertVedtak);

        const { result } = renderHook(() => useKorrigerVedtak({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(korrigertVedtak, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom korrigerVedtak feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(korrigerVedtak).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useKorrigerVedtak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
