import { useDialog } from '@hooks/useDialog';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

interface Context {
    erDialogÅpen: boolean;
    åpneDialog: () => void;
    lukkDialog: () => void;
}

const Context = createContext<Context | undefined>(undefined);

interface Props {
    initialErÅpen?: boolean;
    children: ReactNode | ((context: Context) => ReactNode);
}

export function EndringstidspunktDialogProvider({ initialErÅpen, children }: Props) {
    const { åpen: erDialogÅpen, åpne: åpneDialog, lukk: lukkDialog } = useDialog(initialErÅpen);
    const value = useMemo(() => ({ erDialogÅpen, åpneDialog, lukkDialog }), [erDialogÅpen, åpneDialog, lukkDialog]);

    return (
        <Context.Provider value={value}>{typeof children === 'function' ? children(value) : children}</Context.Provider>
    );
}

export function useEndringstidspunktDialogContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useEndringstidspunktDialogContext må brukes innenfor en EndringstidspunktDialogProvider.');
    }
    return context;
}
