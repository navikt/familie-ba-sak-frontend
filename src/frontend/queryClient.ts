import { queryKeys } from '@hooks/keys/queryKeys';
import { QueryClient, type QueryKey } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Fungerer ikke så bra med global "Systemet laster" spinner, på sikt kan vi kanskje enable retries
        },
        mutations: {
            retry: false, // Fungerer ikke så bra med global "Systemet laster" spinner, på sikt kan vi kanskje enable retries
        },
    },
});

function erBehandlingQueryKey(queryKey: QueryKey) {
    const [nøkkel] = queryKeys.behandling(undefined);
    return queryKey.length === 2 && queryKey[0] === nøkkel && typeof queryKey[1] === 'number';
}

function invaliderQueriesSomAvhengerAvBehandling(queryClient: QueryClient, behandling: IBehandling) {
    queryClient.invalidateQueries({
        queryKey: queryKeys.fagsak(behandling.fagsakId),
    });
    queryClient.invalidateQueries({
        queryKey: queryKeys.historikkinnslag(behandling.behandlingId),
    });
    queryClient.invalidateQueries({
        queryKey: queryKeys.personerMedUgyldigEtterbetalingsperiode(behandling.behandlingId),
    });
}

/**
 * Invaliderer queries som avhenger av behandlingen hver gang behandlingen i cachen oppdateres, enten via
 * setQueryData eller ved refetch etter invalidering. Første henting av behandlingen ignoreres.
 * Manuelle skrivinger invaliderer alltid, også når queryen er fjernet fra cachen og opprettes på nytt
 * (f.eks. et mutasjonssvar som kommer etter at brukeren har forlatt behandlingen).
 * Behandlingsnøkkelen selv invalideres ikke, for å unngå en uendelig løkke.
 */
export function registrerQueryClientLyttere(queryClient: QueryClient) {
    return queryClient.getQueryCache().subscribe(event => {
        if (event.type !== 'updated' || event.action.type !== 'success') {
            return;
        }
        const { query, action } = event;
        if (erBehandlingQueryKey(query.queryKey) && (action.manual || query.state.dataUpdateCount > 1)) {
            invaliderQueriesSomAvhengerAvBehandling(queryClient, query.state.data as IBehandling);
        }
    });
}

registrerQueryClientLyttere(queryClient);
