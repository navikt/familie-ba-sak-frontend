import React, { type PropsWithChildren } from 'react';

import { HttpProvider } from '@navikt/familie-http';

import { useAuthContext } from './AuthContext';

interface Props extends PropsWithChildren {
    fjernRessursSomLasterTimeout?: number;
}

export function HttpContextProvider({ fjernRessursSomLasterTimeout = 300, children }: Props) {
    const { innloggetSaksbehandler, settAutentisert } = useAuthContext();

    return (
        <HttpProvider
            innloggetSaksbehandler={innloggetSaksbehandler}
            settAutentisert={settAutentisert}
            fjernRessursSomLasterTimeout={fjernRessursSomLasterTimeout}
        >
            {children}
        </HttpProvider>
    );
}
