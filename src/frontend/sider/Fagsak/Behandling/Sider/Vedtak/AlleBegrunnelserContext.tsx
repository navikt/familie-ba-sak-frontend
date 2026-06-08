import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import type { AlleBegrunnelser } from '@typer/vilkår';

interface AlleBegrunnelserContext {
    alleBegrunnelser: AlleBegrunnelser;
}

const AlleBegrunnelserContext = createContext<AlleBegrunnelserContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    alleBegrunnelser: AlleBegrunnelser;
}

export function AlleBegrunnelserProvider({ alleBegrunnelser, children }: Props) {
    return <AlleBegrunnelserContext.Provider value={{ alleBegrunnelser }}>{children}</AlleBegrunnelserContext.Provider>;
}

export function useAlleBegrunnelserContext() {
    const context = useContext(AlleBegrunnelserContext);
    if (context === undefined) {
        throw new Error('useAlleBegrunnelserContext må brukes innenfor en AlleBegrunnelserProvider');
    }
    return context;
}
