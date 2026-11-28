import { sjekkSaksbehandlertilgangTilIdent, type Tilgangsresultat } from '@api/sjekkSaksbehandlertilgangTilIdent';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { Adressebeskyttelsegradering } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSjekkSaksbehandlertilgangTilIdent } from './useSjekkSaksbehandlertilgangTilIdent';

vi.mock('@api/sjekkSaksbehandlertilgangTilIdent');

afterEach(() => {
    vi.clearAllMocks();
});

const tilgangsresultat: Tilgangsresultat = {
    saksbehandlerHarTilgang: false,
    adressebeskyttelsegradering: Adressebeskyttelsegradering.STRENGT_FORTROLIG,
};

describe('useSjekkSaksbehandlertilgangTilIdent', () => {
    test('skal sjekke tilgang og kalle onSuccess', async () => {
        // Arrange
        const onSuccess = vi.fn();
        const parameters = { brukerIdent: '12345678903' };
        vi.mocked(sjekkSaksbehandlertilgangTilIdent).mockResolvedValueOnce(tilgangsresultat);

        const { result } = renderHook(() => useSjekkSaksbehandlertilgangTilIdent({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(sjekkSaksbehandlertilgangTilIdent).toHaveBeenCalledTimes(1);
        expect(sjekkSaksbehandlertilgangTilIdent).toHaveBeenCalledWith({ brukerIdent: '12345678903' });
        expect(result.current.data).toEqual(tilgangsresultat);
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(onSuccess.mock.calls[0]?.[0]).toEqual(tilgangsresultat);
        expect(onSuccess.mock.calls[0]?.[1]).toEqual(parameters);
    });

    test('skal håndtere feil ved sjekk av tilgang', async () => {
        // Arrange
        const feil = new Error('Sjekk av tilgang feilet');
        vi.mocked(sjekkSaksbehandlertilgangTilIdent).mockRejectedValueOnce(feil);

        const { result } = renderHook(() => useSjekkSaksbehandlertilgangTilIdent(), { wrapper: TestProviders });

        // Act
        result.current.mutate({ brukerIdent: '12345678903' });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
    });
});
