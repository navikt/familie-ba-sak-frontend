import { type PropsWithChildren } from 'react';

import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import {
    useSlettVilkårResultat,
    SlettVilkårResultatMutationKeyFactory,
    type Parameters,
} from './useSlettVilkårResultat';

vi.mock('@api/slettVilkårResultat', () => ({
    slettVilkårResultat: vi.fn(),
}));

function Wrapper({ children }: PropsWithChildren) {
    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: { retry: false },
        },
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('useSlettVilkårResultat', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const parameters: Parameters = {
        behandlingId: 123,
        vilkårResultatId: 456,
        personIdent: '12345678910',
    };

    test('skal kalle slettVilkårResultat med riktige pathParams og payload', async () => {
        const behandling = lagBehandling();

        vi.mocked(slettVilkårResultat).mockResolvedValueOnce(behandling);

        const { result } = renderHook(() => useSlettVilkårResultat(), { wrapper: Wrapper });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(slettVilkårResultat).toHaveBeenCalledTimes(1);
        expect(slettVilkårResultat).toHaveBeenCalledWith(
            { behandlingId: 123, vilkårResultatId: 456 },
            { personIdent: '12345678910' }
        );
    });

    test('skal returnere behandlingen ved vellykket sletting', async () => {
        const behandling = lagBehandling();

        vi.mocked(slettVilkårResultat).mockResolvedValueOnce(behandling);

        const { result } = renderHook(() => useSlettVilkårResultat(), { wrapper: Wrapper });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(behandling);
    });

    test('skal sette isError dersom slettVilkårResultat feiler', async () => {
        const feilmelding = new Error('Noe gikk feil');

        vi.mocked(slettVilkårResultat).mockRejectedValueOnce(feilmelding);

        const { result } = renderHook(() => useSlettVilkårResultat(), { wrapper: Wrapper });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toEqual(feilmelding);
    });

    test('skal videresende options, som onSuccess, til useMutation', async () => {
        const behandling = lagBehandling();

        vi.mocked(slettVilkårResultat).mockResolvedValueOnce(behandling);

        const onSuccess = vi.fn();

        const { result } = renderHook(() => useSlettVilkårResultat({ onSuccess }), { wrapper: Wrapper });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    test('skal eksponere riktig mutationKey fra factory', () => {
        expect(SlettVilkårResultatMutationKeyFactory.slettVilkårResultat()).toEqual(['slettVilkårResultat']);
    });
});
