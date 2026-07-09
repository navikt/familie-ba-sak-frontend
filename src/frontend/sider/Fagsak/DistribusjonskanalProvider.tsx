import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import type { Distribusjonskanal } from '@typer/dokument';

type DistribusjonskanalContext =
    | { distribusjonskanal: Distribusjonskanal; distribusjonskanalError: undefined }
    | { distribusjonskanal: undefined; distribusjonskanalError: Error };

const Context = createContext<DistribusjonskanalContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    context: DistribusjonskanalContext;
}

export function DistribusjonskanalProvider({ context, children }: Props) {
    return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useDistribusjonskanalContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useDistribusjonskanalContext må brukes innenfor en DistribusjonskanalProvider.');
    }
    return context;
}
