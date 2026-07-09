import { type PropsWithChildren, useState } from 'react';

import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { useSlettVilkårResultat, type Parameters } from '@hooks/useSlettVilkårResultat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { useSlettVilkårResultatError } from './useSlettVilkårResultatError';

vi.mock('@api/slettVilkårResultat', () => ({
    slettVilkårResultat: vi.fn(),
}));

function Wrapper({ children }: PropsWithChildren) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    mutations: { retry: false },
                },
            })
    );
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

const VILKÅR_RESULTAT_ID = 456;

const parameters: Parameters = {
    behandlingId: 123,
    vilkårResultatId: VILKÅR_RESULTAT_ID,
    personIdent: '12345678910',
};

describe('useSlettVilkårResultatError', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('skal returnere undefined når ingen mutasjoner har feilet', () => {
        const { result } = renderHook(() => useSlettVilkårResultatError(VILKÅR_RESULTAT_ID), {
            wrapper: Wrapper,
        });

        expect(result.current).toBeUndefined();
    });

    test('skal returnere feilen for en mutasjon med samme vilkårResultatId', async () => {
        const feilmelding = new Error('Noe gikk feil');

        vi.mocked(slettVilkårResultat).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(
            () => ({
                slett: useSlettVilkårResultat(),
                error: useSlettVilkårResultatError(VILKÅR_RESULTAT_ID),
            }),
            { wrapper: Wrapper }
        );

        result.current.slett.mutate(parameters);

        await waitFor(() => expect(result.current.error).toEqual(feilmelding));
    });

    test('skal returnere undefined når vilkårResultatId ikke matcher den feilede mutasjonen', async () => {
        const feilmelding = new Error('Noe gikk feil');

        vi.mocked(slettVilkårResultat).mockRejectedValueOnce(feilmelding);

        const annetVilkårResultatId = 999;

        const { result } = renderHook(
            () => ({
                slett: useSlettVilkårResultat(),
                error: useSlettVilkårResultatError(annetVilkårResultatId),
            }),
            { wrapper: Wrapper }
        );

        result.current.slett.mutate(parameters);

        await waitFor(() => expect(result.current.slett.isError).toBe(true));

        expect(result.current.error).toBeUndefined();
    });

    test('skal returnere den siste feilen når flere mutasjoner med samme vilkårResultatId har feilet', async () => {
        const førsteFeil = new Error('Første feil');
        const andreFeil = new Error('Andre feil');

        vi.mocked(slettVilkårResultat).mockRejectedValueOnce(førsteFeil).mockRejectedValueOnce(andreFeil);

        const { result } = renderHook(
            () => ({
                slett: useSlettVilkårResultat(),
                error: useSlettVilkårResultatError(VILKÅR_RESULTAT_ID),
            }),
            { wrapper: Wrapper }
        );

        result.current.slett.mutate(parameters);
        await waitFor(() => expect(result.current.error).toEqual(førsteFeil));

        result.current.slett.mutate(parameters);
        await waitFor(() => expect(result.current.error).toEqual(andreFeil));
    });
});
