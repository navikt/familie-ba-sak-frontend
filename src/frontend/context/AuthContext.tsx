import type { PropsWithChildren } from 'react';
import { useContext, createContext, useState } from 'react';

interface Context {
    autentisert: boolean;
    settAutentisert: (autentisert: boolean) => void;
}

const AuthContext = createContext<Context | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [autentisert, settAutentisert] = useState(true);

    return <AuthContext.Provider value={{ autentisert, settAutentisert }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext må brukes innenfor AuthContextProvider');
    }
    return context;
}
