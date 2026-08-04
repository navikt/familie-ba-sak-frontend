import { type ReactNode, useCallback, useMemo, useState, createContext, useContext } from 'react';

interface BekreftEndringModalContext {
    erBekreftEndringModalÅpen: boolean;
    bekreftEndringFeilmelding: string | undefined;
    settBekreftEndringFeilmelding: (feilmelding: string) => void;
    åpneBekreftEndringModal: (feilmelding: string) => void;
    lukkBekreftEndringModal: () => void;
}

const Context = createContext<BekreftEndringModalContext | undefined>(undefined);

interface Props {
    children: ReactNode | ((context: BekreftEndringModalContext) => ReactNode);
}

export function BekreftEndringModalProvider({ children }: Props) {
    const [erBekreftEndringModalÅpen, settErBekreftEndringModalÅpen] = useState(false);
    const [bekreftEndringFeilmelding, settBekreftEndringFeilmelding] = useState<string | undefined>(undefined);

    const åpneBekreftEndringModal = useCallback((feilmelding: string) => {
        settBekreftEndringFeilmelding(feilmelding);
        settErBekreftEndringModalÅpen(true);
    }, []);

    const lukkBekreftEndringModal = useCallback(() => {
        settErBekreftEndringModalÅpen(false);
        settBekreftEndringFeilmelding(undefined);
    }, []);

    const value = useMemo(
        () => ({
            erBekreftEndringModalÅpen,
            bekreftEndringFeilmelding,
            settBekreftEndringFeilmelding,
            åpneBekreftEndringModal,
            lukkBekreftEndringModal,
        }),
        [
            erBekreftEndringModalÅpen,
            bekreftEndringFeilmelding,
            settBekreftEndringFeilmelding,
            åpneBekreftEndringModal,
            lukkBekreftEndringModal,
        ]
    );

    return (
        <Context.Provider value={value}>{typeof children === 'function' ? children(value) : children}</Context.Provider>
    );
}

export function useBekreftEndringModalContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useBekreftEndringModalContext må brukes innenfor en BekreftEndringModalProvider.');
    }
    return context;
}
