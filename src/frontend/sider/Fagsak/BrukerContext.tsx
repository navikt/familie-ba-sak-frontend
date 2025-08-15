import React, { createContext, type PropsWithChildren, useContext } from 'react';

import type { IPersonInfo } from '../../typer/person';

interface BrukerContext {
    bruker: IPersonInfo;
}

interface Props extends PropsWithChildren {
    bruker: IPersonInfo;
}

const BrukerContext = createContext<BrukerContext | undefined>(undefined);

export function BrukerProvider({ bruker, children }: Props) {
    return <BrukerContext.Provider value={{ bruker }}> {children} </BrukerContext.Provider>;
}

export function useBrukerContext() {
    const context = useContext(BrukerContext);
    if (context === undefined) {
        throw new Error('useBrukerContext må brukes innenfor en BrukerProvider');
    }
    return context;
}
