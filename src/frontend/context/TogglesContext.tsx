import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import { GlobalAlert } from '@navikt/ds-react';

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
            <GlobalAlert status={'error'}>
                <GlobalAlert.Header>
                    <GlobalAlert.Title>Feil oppstod under lasting av toggles</GlobalAlert.Title>
                </GlobalAlert.Header>
                <GlobalAlert.Content>{error.message}</GlobalAlert.Content>
            </GlobalAlert>
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
