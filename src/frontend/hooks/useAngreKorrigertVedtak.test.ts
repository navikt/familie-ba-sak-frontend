import { angreKorrigertVedtak } from '@api/angreKorrigertVedtak';
import { useAngreKorrigertVedtak } from '@hooks/useAngreKorrigertVedtak';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/angreKorrigertVedtak');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('useAngreKorrigertVedtak', () => {
    test('kaller angreKorrigertVedtak med riktig payload', async () => {
        // Arrange
        vi.mocked(angreKorrigertVedtak).mockResolvedValue(behandling);

        const { result } = renderHook(() => useAngreKorrigertVedtak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(angreKorrigertVedtak).toHaveBeenCalledWith(behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(angreKorrigertVedtak).mockResolvedValue(behandling);

        const { result } = renderHook(() => useAngreKorrigertVedtak({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, behandlingId, undefined, expect.any(Object));
    });

    test('skal sette isError dersom angreKorrigertVedtak feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(angreKorrigertVedtak).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useAngreKorrigertVedtak(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
