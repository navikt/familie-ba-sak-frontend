import { registrerInstitusjon } from '@api/registrerInstitusjon';
import { useRegistrerInstitusjon } from '@hooks/useRegistrerInstitusjon';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/registrerInstitusjon');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const parameters = {
    behandlingId: behandling.behandlingId,
};

describe('useRegistrerInstitusjon', () => {
    test('skal kalle registrerInstitusjon med behandlingId', async () => {
        // Arrange
        vi.mocked(registrerInstitusjon).mockResolvedValue(behandling);

        const { result } = renderHook(() => useRegistrerInstitusjon(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(registrerInstitusjon).toHaveBeenCalledWith({ behandlingId: parameters.behandlingId });
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(registrerInstitusjon).mockResolvedValue(behandling);

        const { result } = renderHook(() => useRegistrerInstitusjon({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom registrerInstitusjon feiler', async () => {
        // Arrange
        vi.mocked(registrerInstitusjon).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useRegistrerInstitusjon(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
