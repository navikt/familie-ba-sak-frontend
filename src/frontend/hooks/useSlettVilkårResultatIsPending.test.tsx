import { type PropsWithChildren, useState } from 'react';

import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { useSlettVilkårResultat, type Parameters } from '@hooks/useSlettVilkårResultat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { useSlettVilkårResultatIsPending } from './useSlettVilkårResultatIsPending';

vi.mock('@api/slettVilkårResultat', () => ({
    slettVilkårResultat: vi.fn(),
}));

function lagDeferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>(res => {
        resolve = res;
    });
    return { promise, resolve };
}

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

describe('useSlettVilkårResultatIsPending', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('skal returnere false når ingen mutasjon pågår', () => {
        const { result } = renderHook(() => useSlettVilkårResultatIsPending(VILKÅR_RESULTAT_ID), {
            wrapper: Wrapper,
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere true mens en mutasjon med samme vilkårResultatId pågår, og false når den er ferdig', async () => {
        const deferred = lagDeferred<Awaited<ReturnType<typeof slettVilkårResultat>>>();

        vi.mocked(slettVilkårResultat).mockReturnValueOnce(deferred.promise);

        const { result } = renderHook(
            () => ({
                slett: useSlettVilkårResultat(),
                isPending: useSlettVilkårResultatIsPending(VILKÅR_RESULTAT_ID),
            }),
            { wrapper: Wrapper }
        );

        result.current.slett.mutate(parameters);

        await waitFor(() => expect(result.current.isPending).toBe(true));

        deferred.resolve(lagBehandling());

        await waitFor(() => expect(result.current.isPending).toBe(false));
    });

    test('skal returnere false når en pågående mutasjon har en annen vilkårResultatId', async () => {
        const deferred = lagDeferred<Awaited<ReturnType<typeof slettVilkårResultat>>>();

        vi.mocked(slettVilkårResultat).mockReturnValueOnce(deferred.promise);

        const annetVilkårResultatId = 999;

        const { result } = renderHook(
            () => ({
                slett: useSlettVilkårResultat(),
                isPending: useSlettVilkårResultatIsPending(annetVilkårResultatId),
            }),
            { wrapper: Wrapper }
        );

        result.current.slett.mutate(parameters);

        await waitFor(() => expect(result.current.slett.isPending).toBe(true));

        expect(result.current.isPending).toBe(false);

        deferred.resolve(lagBehandling());

        await waitFor(() => expect(result.current.slett.isPending).toBe(false));
    });
});
