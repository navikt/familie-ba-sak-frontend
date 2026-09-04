import { angreKorrigertEtterbetaling } from '@api/angreKorrigertEtterbetaling';
import { useAngreKorrigertEtterbetaling } from '@hooks/useAngreKorrigertEtterbetaling';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/angreKorrigertEtterbetaling');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('useAngreKorrigertEtterbetaling', () => {
    test('kaller angreKorrigertEtterbetaling med riktig payload', async () => {
        // Arrange
        vi.mocked(angreKorrigertEtterbetaling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useAngreKorrigertEtterbetaling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(angreKorrigertEtterbetaling).toHaveBeenCalledWith(behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(angreKorrigertEtterbetaling).mockResolvedValue(behandling);

        const { result } = renderHook(() => useAngreKorrigertEtterbetaling({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, behandlingId, undefined, expect.any(Object));
    });

    test('skal sette isError dersom angreKorrigertEtterbetaling feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(angreKorrigertEtterbetaling).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useAngreKorrigertEtterbetaling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(behandlingId);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
