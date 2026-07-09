import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import { useFagsak } from '@hooks/useFagsak';
import { useNavigerAutomatiskTilSideForBehandlingssteg } from '@hooks/useNavigerAutomatiskTilSideForBehandlingssteg';
import { useTrackTidsbrukPåSide } from '@hooks/useTrackTidsbrukPåSide';
import type { IBehandling } from '@typer/behandling';

import { type Ressurs } from '@navikt/familie-typer';

import { useHentOgSettBehandlingContext } from './HentOgSettBehandlingContext';

interface Props extends PropsWithChildren {
    behandling: IBehandling;
}

interface BehandlingContextValue {
    behandling: IBehandling;
    settÅpenBehandling: (behandling: Ressurs<IBehandling>) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export function BehandlingProvider({ behandling, children }: Props) {
    const fagsak = useFagsak();

    const { settBehandlingRessurs } = useHentOgSettBehandlingContext();

    useNavigerAutomatiskTilSideForBehandlingssteg({ behandling });
    useTrackTidsbrukPåSide(fagsak, behandling);

    return (
        <BehandlingContext.Provider value={{ behandling, settÅpenBehandling: settBehandlingRessurs }}>
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
