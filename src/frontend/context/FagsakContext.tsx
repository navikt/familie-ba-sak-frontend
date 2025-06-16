import React, { createContext, type PropsWithChildren, useContext, useMemo } from 'react';

import type { IMinimalFagsak } from '../typer/fagsak';

interface FagsakContext {
    fagsak: IMinimalFagsak;
}

const FagsakContext = createContext<FagsakContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    fagsak: IMinimalFagsak;
}

export function FagsakProvider({ fagsak, children }: Props) {
    const value = useMemo(
        () => ({
            fagsak,
        }),
        [fagsak]
    );

    return <FagsakContext.Provider value={value}>{children}</FagsakContext.Provider>;
}

export function useFagsakContext() {
    const context = useContext(FagsakContext);
    if (context === undefined) {
        throw new Error('useFagsakContext må brukes innenfor en FagsakProvider');
    }
    return context;
}
