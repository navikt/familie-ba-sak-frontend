import { sendVedtakTilBeslutter } from '@api/sendVedtakTilBeslutter';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSendVedtakTilBeslutter } from './useSendVedtakTilBeslutter';

vi.mock('@api/sendVedtakTilBeslutter');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useSendVedtakTilBeslutter', () => {
    test('kaller sendVedtakTilBeslutter med riktige parametere', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(sendVedtakTilBeslutter).mockResolvedValue(behandling);

        const parameters = {
            behandlingId: behandling.behandlingId,
            behandlendeEnhet: '4820',
        };

        const { result } = renderHook(() => useSendVedtakTilBeslutter(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(sendVedtakTilBeslutter).toHaveBeenCalledWith(expect.any(Function), parameters);
        expect(result.current.data).toEqual(behandling);
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(sendVedtakTilBeslutter).mockResolvedValue(behandling);

        const parameters = {
            behandlingId: behandling.behandlingId,
            behandlendeEnhet: '4820',
        };

        const { result } = renderHook(() => useSendVedtakTilBeslutter({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object))
        );
    });

    test('Skal håndtere feil', async () => {
        // Arrange
        vi.mocked(sendVedtakTilBeslutter).mockRejectedValue(new Error('Noe gikk galt'));

        const parameters = {
            behandlingId: 123,
            behandlendeEnhet: '4820',
        };

        const { result } = renderHook(() => useSendVedtakTilBeslutter(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
