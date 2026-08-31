import type { IToast, ToastTyper } from '@komponenter/Toast/typer';
import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react';

interface ToastContext {
    settToast: (toastId: ToastTyper, toast: IToast) => void;
    settToasts: Dispatch<SetStateAction<{ [toastId: string]: IToast }>>;
    toasts: { [toastId: string]: IToast };
}

const ToastContext = createContext<ToastContext | undefined>(undefined);

export function ToastProvider({ children }: PropsWithChildren) {
    const [toasts, settToasts] = useState<{ [toastId: string]: IToast }>({});

    function settToast(toastId: ToastTyper, toast: IToast) {
        settToasts(prev => ({ ...prev, [toastId]: toast }));
    }

    const value = useMemo(() => ({ settToast, settToasts, toasts }), [toasts]);

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToastContext() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToastContext må brukes innenfor en ToastProvider.');
    }
    return context;
}
