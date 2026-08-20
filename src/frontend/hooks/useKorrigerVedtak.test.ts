import { korrigerVedtak } from '@api/korrigerVedtak';
import { useKorrigerVedtak } from '@hooks/useKorrigerVedtak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/korrigerVedtak');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const parameters = {
    vedtaksdato: '2024-01-01',
    begrunnelse: 'Begrunnelse for korrigering',
    behandlingId: behandling.behandlingId,
};

describe('useKorrigerVedtak', () => {
    test('kaller korrigerVedtak med riktig payload', async () => {
        // Arrange
        vi.mocked(korrigerVedtak).mockResolvedValue(behandling);

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
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(korrigerVedtak).mockResolvedValue(behandling);

        const { result } = renderHook(() => useKorrigerVedtak({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
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
