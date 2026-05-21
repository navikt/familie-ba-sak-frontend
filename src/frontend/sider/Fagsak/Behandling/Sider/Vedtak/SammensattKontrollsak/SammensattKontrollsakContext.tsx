import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

interface Props extends PropsWithChildren {
    sammensattKontrollsak?: IRestSammensattKontrollsak;
}

interface SammensattKontrollsakContext {
    sammensattKontrollsak: IRestSammensattKontrollsak | undefined;
}

const SammensattKontrollsakContext = createContext<SammensattKontrollsakContext | undefined>(undefined);

export function SammensattKontrollsakProvider({ sammensattKontrollsak, children }: Props) {
    return (
        <SammensattKontrollsakContext.Provider value={{ sammensattKontrollsak }}>
            {children}
        </SammensattKontrollsakContext.Provider>
    );
}

export function useSammensattKontrollsakContext() {
    const context = useContext(SammensattKontrollsakContext);
    if (context === undefined) {
        throw new Error('useSammensattKontrollsakContext må brukes innenfor en SammensattKontrollsak');
    }
    return context;
}
