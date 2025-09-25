import React from 'react';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';

interface Context {
    erModalÅpen: boolean;
    åpneModal: () => void;
    lukkModal: () => void;
    toggleModal: () => void;
}

const Context = createContext<Context | undefined>(undefined);

export function LeggTilBarnModalContextProvider({ children }: PropsWithChildren) {
    const [erModalÅpen, settErModalÅpen] = useState(false);

    function lukkModal() {
        settErModalÅpen(false);
    }

    function åpneModal() {
        settErModalÅpen(true);
    }

    function toggleModal() {
        settErModalÅpen(prev => !prev);
    }

    return <Context.Provider value={{ erModalÅpen, lukkModal, åpneModal, toggleModal }}>{children}</Context.Provider>;
}

export function useLeggTilBarnModalContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useLeggTilBarnModalContext må brukes innenfor en LeggTilBarnModalContextProvider');
    }
    return context;
}
