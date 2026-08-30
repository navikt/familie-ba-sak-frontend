import { useBehandling } from '@hooks/useBehandling';
import {
    type Simuleringsvurdering,
    utledSimuleringsvurdering,
} from '@sider/Fagsak/Behandling/Sider/Simulering/simuleringsvurdering';
import type { IAvregningsperiode, IOverlappendePeriodeMedAndreFagsaker, ISimuleringDTO } from '@typer/simulering';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

interface Props extends PropsWithChildren {
    simulering: ISimuleringDTO;
    harÅpenTilbakekreving: boolean;
}

interface SimuleringContextValue extends Simuleringsvurdering {
    simulering: ISimuleringDTO;
    harÅpenTilbakekreving: boolean;
    avregningsperioder: IAvregningsperiode[];
    overlappendePerioderMedAndreFagsaker: IOverlappendePeriodeMedAndreFagsaker[];
}

const SimuleringContext = createContext<SimuleringContextValue | undefined>(undefined);

export function SimuleringProvider({ simulering, harÅpenTilbakekreving, children }: Props) {
    const behandling = useBehandling();

    const simuleringsvurdering = useMemo(
        () => utledSimuleringsvurdering(simulering, behandling),
        [simulering, behandling]
    );

    const value = useMemo(
        () => ({
            ...simuleringsvurdering,
            simulering,
            harÅpenTilbakekreving,
            avregningsperioder: simulering.avregningsperioder,
            overlappendePerioderMedAndreFagsaker: simulering.overlappendePerioderMedAndreFagsaker,
        }),
        [simuleringsvurdering, simulering, harÅpenTilbakekreving]
    );

    return <SimuleringContext.Provider value={value}>{children}</SimuleringContext.Provider>;
}

export function useSimuleringContext() {
    const context = useContext(SimuleringContext);

    if (context === undefined) {
        throw new Error('useSimuleringContext må brukes innenfor en SimuleringProvider');
    }

    return context;
}
