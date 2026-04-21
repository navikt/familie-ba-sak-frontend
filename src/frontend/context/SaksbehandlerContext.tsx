import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { Box, LocalAlert } from '@navikt/ds-react';

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
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>Feil oppstod ved innlasting av saksbehandler</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>{error.message ?? 'En ukjent feil oppstod.'}</LocalAlert.Content>
                </LocalAlert>
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
