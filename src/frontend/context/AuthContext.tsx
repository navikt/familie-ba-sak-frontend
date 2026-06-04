import { type PropsWithChildren, useEffect, useContext, createContext, useState } from 'react';

import { apiClient } from '@api/client/apiClient';

interface Context {
    autentisert: boolean;
    settAutentisert: (autentisert: boolean) => void;
}

const AuthContext = createContext<Context | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [autentisert, settAutentisert] = useState(true);

    useEffect(() => {
        const interceptorId = apiClient.addResponseInterceptor({
            onRejected: error => {
                if (error.response?.status === 401) {
                    settAutentisert(false);
                }
                return Promise.reject(error);
            },
        });
        return () => {
            apiClient.removeResponseInterceptor(interceptorId);
        };
    }, []);

    return <AuthContext.Provider value={{ autentisert, settAutentisert }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext må brukes innenfor AuthContextProvider');
    }
    return context;
}
