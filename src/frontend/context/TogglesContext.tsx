import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { Alert, BodyShort, ErrorMessage } from '@navikt/ds-react';

import { useHentToggles } from '../hooks/useHentToggles';
import SystemetLaster from '../komponenter/SystemetLaster/SystemetLaster';
import type { Toggles } from '../typer/toggles';

interface TogglesContext {
    toggles: Toggles;
}

const TogglesContext = createContext<TogglesContext | undefined>(undefined);

export function TogglesProvider({ children }: PropsWithChildren) {
    const { data, isPending, error } = useHentToggles();

    if (isPending) {
        return <SystemetLaster />;
    }

    if (error) {
        return (
            <Alert variant={'error'}>
                <BodyShort>Feil oppstod under lasting av toggles</BodyShort>
                <ErrorMessage>{error.message}</ErrorMessage>
            </Alert>
        );
    }

    return <TogglesContext.Provider value={{ toggles: data }}>{children}</TogglesContext.Provider>;
}

export function useTogglesContext() {
    const context = useContext(TogglesContext);
    if (context === undefined) {
        throw new Error('useTogglesContext må brukes innenfor en TogglesProvider');
    }
    return context;
}
