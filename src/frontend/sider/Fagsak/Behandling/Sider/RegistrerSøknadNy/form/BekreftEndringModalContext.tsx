import { type ReactNode, useCallback, useMemo, useState, createContext, useContext } from 'react';

interface BekreftEndringModalContext {
    erBekreftEndringModalÅpen: boolean;
    åpneBekreftEndringModal: () => void;
    lukkBekreftEndringModal: () => void;
}

const Context = createContext<BekreftEndringModalContext | undefined>(undefined);

interface Props {
    children: ReactNode | ((context: BekreftEndringModalContext) => ReactNode);
}

export function BekreftEndringModalProvider({ children }: Props) {
    const [erBekreftEndringModalÅpen, settErBekreftEndringModalÅpen] = useState(false);

    const åpneBekreftEndringModal = useCallback(() => {
        settErBekreftEndringModalÅpen(true);
    }, []);

    const lukkBekreftEndringModal = useCallback(() => {
        settErBekreftEndringModalÅpen(false);
    }, []);

    const value = useMemo(
        () => ({
            erBekreftEndringModalÅpen,
            åpneBekreftEndringModal,
            lukkBekreftEndringModal,
        }),
        [erBekreftEndringModalÅpen, åpneBekreftEndringModal, lukkBekreftEndringModal]
    );

    return (
        <Context.Provider value={value}>{typeof children === 'function' ? children(value) : children}</Context.Provider>
    );
}

export function useBekreftEndringModalContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useBekreftEndringModalContext må brukes innenfor en BekreftModalProvider.');
    }
    return context;
}
