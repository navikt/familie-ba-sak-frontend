import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface VedtaksperioderContext {
    vedtaksperioder: IVedtaksperiodeMedBegrunnelser[];
}

const VedtaksperioderContext = createContext<VedtaksperioderContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    vedtaksperioder: IVedtaksperiodeMedBegrunnelser[];
}

export function VedtaksperioderProvider({ vedtaksperioder, children }: Props) {
    return <VedtaksperioderContext.Provider value={{ vedtaksperioder }}>{children}</VedtaksperioderContext.Provider>;
}

export function useVedtaksperioderContext() {
    const context = useContext(VedtaksperioderContext);
    if (context === undefined) {
        throw new Error('useVedtaksperioderContext må brukes innenfor en VedtaksperioderProvider');
    }
    return context;
}
