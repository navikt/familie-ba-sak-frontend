import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import { TotrinnskontrollBeslutning } from '../../../../../typer/totrinnskontroll';

interface Context {
    erModalÅpen: boolean;
    åpneModal: (beslutning: TotrinnskontrollBeslutning) => void;
    lukkModal: () => void;
    beslutning: TotrinnskontrollBeslutning;
}

const TotrinnskontrollContext = createContext<Context | undefined>(undefined);

export function TotrinnskontrollModalContextProvider({ children }: PropsWithChildren) {
    const [erModalÅpen, settErModalÅpen] = useState(false);
    const [beslutning, settBeslutning] = useState(TotrinnskontrollBeslutning.IKKE_VURDERT);

    const åpneModal = useCallback((beslutning: TotrinnskontrollBeslutning) => {
        settBeslutning(beslutning);
        settErModalÅpen(true);
    }, []);

    const lukkModal = useCallback(() => {
        settErModalÅpen(false);
        settBeslutning(TotrinnskontrollBeslutning.IKKE_VURDERT);
    }, []);

    const value = useMemo(
        () => ({
            erModalÅpen,
            åpneModal,
            lukkModal,
            beslutning,
        }),
        [erModalÅpen, beslutning, åpneModal, lukkModal]
    );

    return <TotrinnskontrollContext.Provider value={value}>{children}</TotrinnskontrollContext.Provider>;
}

export function useTotrinnskontrollModalContext() {
    const context = useContext(TotrinnskontrollContext);
    if (context === undefined) {
        throw new Error('useTotrinnskontrollModalContext må brukes innenfor en TotrinnskontrollModalContextProvider.');
    }
    return context;
}
