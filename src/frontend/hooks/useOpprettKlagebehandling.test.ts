import { opprettKlagebehandling } from '@api/opprettKlagebehandling';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOpprettKlagebehandling } from './useOpprettKlagebehandling';

vi.mock('@api/opprettKlagebehandling');

afterEach(() => {
    vi.clearAllMocks();
});

const parameters = {
    klageMottattDato: '2026-08-07',
    fagsakId: 123,
};

describe('useOpprettKlagebehandling', () => {
    test('kaller opprettKlagebehandling med riktig klageMottattDato og fagsakId', async () => {
        // Arrange
        vi.mocked(opprettKlagebehandling).mockResolvedValue(parameters.fagsakId);

        const { result } = renderHook(() => useOpprettKlagebehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettKlagebehandling).toHaveBeenCalledWith(
            { klageMottattDato: parameters.klageMottattDato },
            parameters.fagsakId
        );
        expect(result.current.data).toEqual(parameters.fagsakId);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettKlagebehandling).mockResolvedValue(parameters.fagsakId);

        const { result } = renderHook(() => useOpprettKlagebehandling({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(parameters.fagsakId, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom opprettKlagebehandling feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(opprettKlagebehandling).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useOpprettKlagebehandling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
