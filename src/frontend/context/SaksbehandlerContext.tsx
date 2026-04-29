import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import { Box, GlobalAlert } from '@navikt/ds-react';

import { useHentSaksbehandler } from '../hooks/useHentSaksbehandler';
import SystemetLaster from '../komponenter/SystemetLaster/SystemetLaster';
import type { Saksbehandler } from '../typer/saksbehandler';

interface Context {
    saksbehandler: Saksbehandler;
}

const Context = createContext<Context | undefined>(undefined);

interface Props extends PropsWithChildren {
    saksbehandler?: Saksbehandler;
}

export function SaksbehandlerProvider({ saksbehandler, children }: Props) {
    const { data, isPending, error } = useHentSaksbehandler({ initialData: saksbehandler });

    if (isPending) {
        return <SystemetLaster />;
    }

    if (error) {
        return (
            <Box padding={'space-8'}>
                <GlobalAlert status={'error'}>
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Feil oppstod ved innlasting av saksbehandler</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>{error.message ?? 'En ukjent feil oppstod.'}</GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        );
    }

    return <Context.Provider value={{ saksbehandler: data }}>{children}</Context.Provider>;
}

export function useSaksbehandlerContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useSaksbehandlerContext må brukes innenfor en SaksbehandlerProvider');
    }
    return context;
}
