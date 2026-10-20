import type { BrevmottakerFagsak } from '@typer/brevmottaker';
import { createContext, type PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

interface BrevmottakereFagsakContext {
    brevmottakere: BrevmottakerFagsak[];
    leggTilBrevmottaker: (brevmottaker: BrevmottakerFagsak) => void;
    slettBrevmottaker: (brevmottaker: BrevmottakerFagsak) => void;
    slettAlleBrevmottakere: () => void;
}

const BrevmottakereFagsakContext = createContext<BrevmottakereFagsakContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    initielleBrevmottakere?: BrevmottakerFagsak[];
}

export function BrevmottakereFagsakProvider({ initielleBrevmottakere = [], children }: Props) {
    const [brevmottakere, settBrevmottakere] = useState<BrevmottakerFagsak[]>(initielleBrevmottakere);

    const leggTilBrevmottaker = useCallback((brevmottaker: BrevmottakerFagsak) => {
        settBrevmottakere(prev => [...prev, brevmottaker]);
    }, []);

    const slettBrevmottaker = useCallback((brevmottaker: BrevmottakerFagsak) => {
        settBrevmottakere(prev => prev.filter(i => i.uuid !== brevmottaker.uuid));
    }, []);

    const slettAlleBrevmottakere = useCallback(() => {
        settBrevmottakere([]);
    }, []);

    const value = useMemo(
        () => ({
            brevmottakere,
            leggTilBrevmottaker,
            slettBrevmottaker,
            slettAlleBrevmottakere,
        }),
        [brevmottakere, leggTilBrevmottaker, slettBrevmottaker, slettAlleBrevmottakere]
    );

    return <BrevmottakereFagsakContext.Provider value={value}>{children}</BrevmottakereFagsakContext.Provider>;
}

export function useBrevmottakereFagsakContext() {
    const context = useContext(BrevmottakereFagsakContext);
    if (context === undefined) {
        throw new Error('useBrevmottakereFagsakContext må brukes innenfor en BrevmottakereFagsakProvider');
    }
    return context;
}
