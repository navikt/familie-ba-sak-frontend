import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { Alert, BodyShort, ErrorMessage } from '@navikt/ds-react';

import { useHentFeatureToggles } from '../hooks/useHentFeatureToggles';
import SystemetLaster from '../komponenter/SystemetLaster/SystemetLaster';
import type { FeatureToggles } from '../typer/featureToggles';

interface FeatureTogglesContext {
    featureToggles: FeatureToggles;
}

const FeatureTogglesContext = createContext<FeatureTogglesContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    featureToggles?: FeatureToggles;
}

export function FeatureTogglesProvider({ featureToggles, children }: Props) {
    const { data, isPending, error } = useHentFeatureToggles({ initialData: featureToggles });

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

    return <FeatureTogglesContext.Provider value={{ featureToggles: data }}>{children}</FeatureTogglesContext.Provider>;
}

export function useFeatureTogglesContext() {
    const context = useContext(FeatureTogglesContext);
    if (context === undefined) {
        throw new Error('useFeatureTogglesContext må brukes innenfor en FeatureTogglesProvider');
    }
    return context;
}
