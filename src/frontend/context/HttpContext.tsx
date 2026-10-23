import { HttpProvider } from '@navikt/familie-http';
import { erPlaywright } from '@utils/miljø';
import type { PropsWithChildren } from 'react';
import { useAuthContext } from './AuthContext';

interface Props extends PropsWithChildren {
    fjernRessursSomLasterTimeout?: number;
}

export function HttpContextProvider({ fjernRessursSomLasterTimeout = erPlaywright() ? 0 : 300, children }: Props) {
    const { settAutentisert } = useAuthContext();

    return (
        <HttpProvider settAutentisert={settAutentisert} fjernRessursSomLasterTimeout={fjernRessursSomLasterTimeout}>
            {children}
        </HttpProvider>
    );
}
