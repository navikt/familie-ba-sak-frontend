import { useFagsak } from '@hooks/useFagsak';
import { useNavigerAutomatiskTilSideForBehandlingssteg } from '@hooks/useNavigerAutomatiskTilSideForBehandlingssteg';
import { useTrackTidsbrukPåSide } from '@hooks/useTrackTidsbrukPåSide';
import type { IBehandling } from '@typer/behandling';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface Props extends PropsWithChildren {
    behandling: IBehandling;
    settBehandling?: (behandling: IBehandling) => void;
}

interface BehandlingContextValue {
    behandling: IBehandling;
    settÅpenBehandling: (behandling: IBehandling) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export function BehandlingProvider({ behandling, settBehandling = () => {}, children }: Props) {
    const fagsak = useFagsak();

    useNavigerAutomatiskTilSideForBehandlingssteg({ behandling });

    useTrackTidsbrukPåSide(fagsak, behandling);

    return (
        <BehandlingContext.Provider value={{ behandling, settÅpenBehandling: settBehandling }}>
            {children}
        </BehandlingContext.Provider>
    );
}

export function useBehandlingContext() {
    const context = useContext(BehandlingContext);
    if (context === undefined) {
        throw new Error('useBehandlingContext må brukes innenfor en BehandlingProvider.');
    }
    return context;
}
