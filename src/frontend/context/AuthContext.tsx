import React, { createContext, useEffect, type PropsWithChildren } from 'react';

import type { ISaksbehandler } from '@navikt/familie-typer';

interface IProps extends PropsWithChildren {
    autentisertSaksbehandler: ISaksbehandler | undefined;
}

interface AuthProviderExports {
    autentisert: boolean;
    settAutentisert: (autentisert: boolean) => void;
    innloggetSaksbehandler: ISaksbehandler | undefined;
}

const AuthContext = createContext<AuthProviderExports | undefined>(undefined);

export const AuthProvider = ({ autentisertSaksbehandler, children }: IProps) => {
    const [autentisert, settAutentisert] = React.useState(true);
    const [innloggetSaksbehandler, settInnloggetSaksbehandler] =
        React.useState(autentisertSaksbehandler);

    useEffect(() => {
        if (autentisertSaksbehandler) {
            settInnloggetSaksbehandler(autentisertSaksbehandler);
        }
    }, [autentisertSaksbehandler]);

    return (
        <AuthContext.Provider value={{ autentisert, settAutentisert, innloggetSaksbehandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth må brukes innenfor AuthProvider');
    }
    return context;
};
