import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { Behandlingstype } from '@typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

interface Props extends PropsWithChildren {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

interface VedtaksperiodeContextValue {
    erPanelEkspandert: boolean;
    onPanelClose: (visAlert: boolean) => void;
    settErSkjemaendringer: (erSkjemaendringer: boolean) => void;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

const VedtaksperiodeContext = createContext<VedtaksperiodeContextValue | undefined>(undefined);

export function VedtaksperiodeProvider({ vedtaksperiodeMedBegrunnelser, children }: Props) {
    const behandling = useBehandling();

    const [erSkjemaendringer, settErSkjemaendringer] = useState(false);

    const [erPanelEkspandert, settErPanelEkspandert] = useState(
        behandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
            vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
            vedtaksperiodeMedBegrunnelser.fritekster.length === 0
    );

    const onPanelClose = (visAlert: boolean) => {
        if (erPanelEkspandert && visAlert && erSkjemaendringer) {
            alert('Periode har endringer som ikke er lagret!');
        } else {
            settErPanelEkspandert(!erPanelEkspandert);
        }
    };

    return (
        <VedtaksperiodeContext.Provider
            value={{
                erPanelEkspandert,
                onPanelClose,
                settErSkjemaendringer,
                vedtaksperiodeMedBegrunnelser,
            }}
        >
            {children}
        </VedtaksperiodeContext.Provider>
    );
}

export function useVedtaksperiodeContext() {
    const context = useContext(VedtaksperiodeContext);
    if (context === undefined) {
        throw new Error('useVedtaksperiodeContext må brukes inne i en VedtaksperiodeProvider');
    }
    return context;
}
