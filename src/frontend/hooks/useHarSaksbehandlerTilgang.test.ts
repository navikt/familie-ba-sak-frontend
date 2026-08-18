import { harSaksbehandlerTilgang } from '@api/harSaksbehandlerTilgang';
import { useHarSaksbehandlerTilgang } from '@hooks/useHarSaksbehandlerTilgang';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { Adressebeskyttelsegradering, type IRestTilgang } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/harSaksbehandlerTilgang');

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    brukerIdent: 'Z123456',
};

const tilgang: IRestTilgang = {
    saksbehandlerHarTilgang: true,
    adressebeskyttelsegradering: Adressebeskyttelsegradering.UGRADERT,
};

describe('useHarSaksbehandlerTilgang', () => {
    test('kaller harSaksbehandlerTilgang med riktig payload', async () => {
        // Arrange
        vi.mocked(harSaksbehandlerTilgang).mockResolvedValue(tilgang);

        const { result } = renderHook(() => useHarSaksbehandlerTilgang(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(harSaksbehandlerTilgang).toHaveBeenCalledWith(payload);
        expect(result.current.data).toEqual(tilgang);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(harSaksbehandlerTilgang).mockResolvedValue(tilgang);

        const { result } = renderHook(() => useHarSaksbehandlerTilgang({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(tilgang, payload, undefined, expect.any(Object));
    });

    test('skal sette isError dersom harSaksbehandlerTilgang feiler', async () => {
        // Arrange
        const feilmelding = new Error('Noe gikk galt');
        vi.mocked(harSaksbehandlerTilgang).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useHarSaksbehandlerTilgang(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(payload);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
