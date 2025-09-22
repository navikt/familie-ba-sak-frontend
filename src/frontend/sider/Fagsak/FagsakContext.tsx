import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { type IMinimalFagsak } from '../../typer/fagsak';

interface IFagsakContext {
    fagsak: IMinimalFagsak;
}

const FagsakContext = createContext<IFagsakContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    fagsak: IMinimalFagsak;
}

export function FagsakProvider({ fagsak, children }: Props) {
    return <FagsakContext.Provider value={{ fagsak }}>{children}</FagsakContext.Provider>;
}

export const useFagsakContext = () => {
    const context = useContext(FagsakContext);

    if (context === undefined) {
        throw new Error('useFagsakContext må brukes innenfor en FagsakProvider');
    }

    return context;
};
