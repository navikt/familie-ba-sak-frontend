import { oppdaterBehandlendeEnhet } from '@api/oppdaterBehandlendeEnhet';
import { useOppdaterBehandlendeEnhet } from '@hooks/useOppdaterBehandlendeEnhet';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterBehandlendeEnhet');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const payload = {
    enhetId: '4806',
    begrunnelse: 'Flytter saken til riktig enhet.',
};

describe('useOppdaterBehandlendeEnhet', () => {
    test('kaller oppdaterBehandlendeEnhet med riktig behandlingId og payload', async () => {
        // Arrange
        vi.mocked(oppdaterBehandlendeEnhet).mockResolvedValue(behandling);

        const { result } = renderHook(() => useOppdaterBehandlendeEnhet(behandling.behandlingId), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterBehandlendeEnhet).toHaveBeenCalledWith(behandling.behandlingId, payload);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal sette isError dersom oppdaterBehandlendeEnhet feiler', async () => {
        // Arrange
        vi.mocked(oppdaterBehandlendeEnhet).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOppdaterBehandlendeEnhet(behandling.behandlingId), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
