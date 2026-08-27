import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface Context {
    erModalÅpen: boolean;
    åpneModal: () => void;
    lukkModal: () => void;
}

const Context = createContext<Context | undefined>(undefined);

export function SendtTilTotrinnskontrollModalProvider({ children }: PropsWithChildren) {
    const [erModalÅpen, settErModalÅpen] = useState(false);

    const åpneModal = useCallback(() => {
        settErModalÅpen(true);
    }, []);

    const lukkModal = useCallback(() => {
        settErModalÅpen(false);
    }, []);

    const value = useMemo(
        () => ({
            erModalÅpen,
            åpneModal,
            lukkModal,
        }),
        [erModalÅpen, åpneModal, lukkModal]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSendtTilTotrinnskontrollModalContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error(
            'useSendtTilTotrinnskontrollModalContext må brukes innenfor en SendtTilTotrinnskontrollModalProvider.'
        );
    }
    return context;
}
