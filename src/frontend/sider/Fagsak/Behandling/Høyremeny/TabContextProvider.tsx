import React, { createContext, type PropsWithChildren, useContext, useState, useMemo } from 'react';

import { useSkalViseTotrinnskontroll } from './useSkalViseTotrinnskontroll';

export enum Tab {
    Totrinnskontroll = 'Totrinnskontroll',
    Historikk = 'Historikk',
    Meldinger = 'Meldinger',
    Dokumenter = 'Dokumenter',
}

interface Context {
    tab: Tab;
    settTab: (tab: Tab) => void;
}

const Context = createContext<Context | undefined>(undefined);

export function TabContextProvider({ children }: PropsWithChildren) {
    const skalViseTotrinnskontroll = useSkalViseTotrinnskontroll();

    const [tab, settTab] = useState(skalViseTotrinnskontroll ? Tab.Totrinnskontroll : Tab.Historikk);

    const value = useMemo(
        () => ({
            tab,
            settTab,
        }),
        [tab, settTab]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTabContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useHøyremenyTabContext må brukes innenfor en HøyremenyTabContextProvider.');
    }
    return context;
}
