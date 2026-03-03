import React, { createContext, useContext } from 'react';
const BrukerContext = createContext(undefined);
export function BrukerProvider({ bruker, children }) {
    return React.createElement(BrukerContext.Provider, { value: { bruker } },
        " ",
        children,
        " ");
}
export function useBrukerContext() {
    const context = useContext(BrukerContext);
    if (context === undefined) {
        throw new Error('useBrukerContext må brukes innenfor en BrukerProvider');
    }
    return context;
}
