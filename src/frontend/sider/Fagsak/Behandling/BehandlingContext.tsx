import { queryKeys } from '@hooks/keys/queryKeys';
import { useFagsak } from '@hooks/useFagsak';
import { useNavigerAutomatiskTilSideForBehandlingssteg } from '@hooks/useNavigerAutomatiskTilSideForBehandlingssteg';
import { useTrackTidsbrukPåSide } from '@hooks/useTrackTidsbrukPåSide';
import { useQueryClient } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

export enum Behandlingskilde {
    /** Behandlingen ligger i query-cachen, og avhengige queries invalideres av registrerQueryClientLyttere. */
    REACT_QUERY = 'REACT_QUERY',
    /** Behandlingen ligger utenfor query-cachen, så avhengige queries må invalideres her. */
    USE_HTTP = 'USE_HTTP',
}

interface Props extends PropsWithChildren {
    behandling: IBehandling;
    settBehandling?: (behandling: IBehandling) => void;
    behandlingskilde?: Behandlingskilde;
}

interface BehandlingContextValue {
    behandling: IBehandling;
    settÅpenBehandling: (behandling: IBehandling) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export function BehandlingProvider({
    behandling,
    settBehandling = () => {},
    behandlingskilde = Behandlingskilde.REACT_QUERY,
    children,
}: Props) {
    const fagsak = useFagsak();
    const queryClient = useQueryClient();

    useNavigerAutomatiskTilSideForBehandlingssteg({ behandling });

    useTrackTidsbrukPåSide(fagsak, behandling);

    function settÅpenBehandling(behandling: IBehandling) {
        if (behandlingskilde === Behandlingskilde.USE_HTTP) {
            queryClient.invalidateQueries({ queryKey: queryKeys.fagsak(fagsak.id) });
            queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandling.behandlingId) });
            queryClient.invalidateQueries({
                queryKey: queryKeys.personerMedUgyldigEtterbetalingsperiode(behandling.behandlingId),
            });
        }
        settBehandling(behandling);
    }

    return (
        <BehandlingContext.Provider value={{ behandling, settÅpenBehandling }}>{children}</BehandlingContext.Provider>
    );
}

export function useBehandlingContext() {
    const context = useContext(BehandlingContext);
    if (context === undefined) {
        throw new Error('useBehandlingContext må brukes innenfor en BehandlingProvider.');
    }
    return context;
}
