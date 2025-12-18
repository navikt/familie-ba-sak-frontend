import React, { createContext, useEffect, type PropsWithChildren, useState } from 'react';

import type { ISaksbehandler } from '@navikt/familie-typer';

interface Context {
    autentisert: boolean;
    settAutentisert: (autentisert: boolean) => void;
    innloggetSaksbehandler: ISaksbehandler | undefined;
}

const AuthContext = createContext<Context | undefined>(undefined);

interface Props extends PropsWithChildren {
    autentisertSaksbehandler: ISaksbehandler | undefined;
}

export function AuthContextProvider({ autentisertSaksbehandler, children }: Props) {
    const [autentisert, settAutentisert] = useState(true);
    const [innloggetSaksbehandler, settInnloggetSaksbehandler] = React.useState(autentisertSaksbehandler);

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
}

export function useAuthContext() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext må brukes innenfor AuthContextProvider');
    }
    return context;
}
