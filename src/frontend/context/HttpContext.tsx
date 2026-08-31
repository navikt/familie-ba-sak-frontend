import { HttpProvider } from '@navikt/familie-http';
import type { PropsWithChildren } from 'react';
import { useSaksbehandler } from '../hooks/useSaksbehandler';
import { useAuthContext } from './AuthContext';

interface Props extends PropsWithChildren {
    fjernRessursSomLasterTimeout?: number;
}

export function HttpContextProvider({ fjernRessursSomLasterTimeout = 300, children }: Props) {
    const { settAutentisert } = useAuthContext();

    const saksbehandler = useSaksbehandler();

    return (
        <HttpProvider
            innloggetSaksbehandler={saksbehandler}
            settAutentisert={settAutentisert}
            fjernRessursSomLasterTimeout={fjernRessursSomLasterTimeout}
        >
            {children}
        </HttpProvider>
    );
}
