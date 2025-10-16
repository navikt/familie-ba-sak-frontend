import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { type IBaseFagsak, sjekkHarBarnEnsligMindreårigFagsak, sjekkHarNormalFagsak } from '../../../../typer/fagsak';

interface FagsakerValue {
    fagsaker: IBaseFagsak[];
    harNormalFagsak: boolean;
    harBarnEnsligMindreårigFagsak: boolean;
}

const FagsakerContext = createContext<FagsakerValue | undefined>(undefined);

interface Props extends PropsWithChildren {
    fagsaker: IBaseFagsak[];
}

export function FagsakerProvider({ fagsaker, children }: Props) {
    const harNormalFagsak = sjekkHarNormalFagsak(fagsaker);
    const harBarnEnsligMindreårigFagsak = sjekkHarBarnEnsligMindreårigFagsak(fagsaker);
    return (
        <FagsakerContext.Provider
            value={{
                fagsaker,
                harNormalFagsak,
                harBarnEnsligMindreårigFagsak,
            }}
        >
            {children}
        </FagsakerContext.Provider>
    );
}

export function useFagsakerContext() {
    const context = useContext(FagsakerContext);
    if (context === undefined) {
        throw new Error('useFagsakerContext må brukes innenfor en FagsakerProvider');
    }
    return context;
}
