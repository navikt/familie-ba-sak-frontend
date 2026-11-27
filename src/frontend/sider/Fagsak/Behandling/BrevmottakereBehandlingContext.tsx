import type { BrevmottakerBehandling } from '@typer/brevmottaker';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';

interface BrevmottakereBehandlingContext {
    brevmottakere: BrevmottakerBehandling[];
}

const BrevmottakereBehandlingContext = createContext<BrevmottakereBehandlingContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    brevmottakere: BrevmottakerBehandling[];
}

export function BrevmottakereBehandlingProvider({ brevmottakere, children }: Props) {
    const value = useMemo(() => ({ brevmottakere }), [brevmottakere]);

    return <BrevmottakereBehandlingContext.Provider value={value}>{children}</BrevmottakereBehandlingContext.Provider>;
}

export function useBrevmottakereBehandling() {
    const context = useContext(BrevmottakereBehandlingContext);
    if (context === undefined) {
        throw new Error('useBrevmottakereBehandling må brukes innenfor en BrevmottakereBehandlingProvider');
    }
    return context.brevmottakere;
}
