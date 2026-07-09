import { settPåVent } from '@api/settPåVent';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { SettPåVentÅrsak } from '@typer/behandling';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSettPåVent } from './useSettPåVent';

vi.mock('@api/settPåVent');

afterEach(() => {
    vi.clearAllMocks();
});

const parameters = {
    behandlingId: 123,
    erBehandlingAlleredePåVent: false,
    frist: '2025-10-10',
    årsak: SettPåVentÅrsak.AVVENTER_DOKUMENTASJON,
};

describe('useSettPåVent', () => {
    test('kaller settPåVent med riktig payload, behandlingId og flagg', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(settPåVent).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSettPåVent(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(settPåVent).toHaveBeenCalledWith(
            { frist: parameters.frist, årsak: parameters.årsak },
            parameters.behandlingId,
            false
        );
        expect(result.current.data).toEqual(behandling);
    });

    test('tråder erBehandlingAlleredePåVent=true gjennom til settPåVent', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        vi.mocked(settPåVent).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSettPåVent(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ ...parameters, erBehandlingAlleredePåVent: true });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(settPåVent).toHaveBeenCalledWith(
            { frist: parameters.frist, årsak: parameters.årsak },
            parameters.behandlingId,
            true
        );
    });

    test('kaller onSuccess-callback med behandling ved vellykket mutasjon', async () => {
        // Arrange
        const behandling = lagBehandling({ behandlingId: 123 });
        const onSuccess = vi.fn();
        vi.mocked(settPåVent).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSettPåVent({ onSuccess }), {
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
        vi.mocked(settPåVent).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSettPåVent(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
