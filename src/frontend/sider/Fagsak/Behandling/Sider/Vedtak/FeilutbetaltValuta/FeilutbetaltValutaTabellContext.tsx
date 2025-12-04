import React, {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useCallback,
    useContext,
    useState,
} from 'react';

import { useBehandlingContext } from '../../../context/BehandlingContext';

interface FeilutbetaltValutaTabellContext {
    erFeilutbetaltValutaTabellSynlig: boolean;
    visFeilutbetaltValutaTabell: () => void;
    skjulFeilutbetaltValutaTabell: () => void;
    erUlagretNyFeilutbetaltValutaPeriode: boolean;
    settErUlagretNyFeilutbetaltValutaPeriode: Dispatch<SetStateAction<boolean>>;
}

const FeilutbetaltValutaTabellContext = createContext<FeilutbetaltValutaTabellContext | undefined>(undefined);

export function FeilutbetaltValutaTabellProvider({ children }: PropsWithChildren) {
    const { behandling } = useBehandlingContext();

    const [erFeilutbetaltValutaTabellSynlig, settErFeilutbetaltValutaTabellSynlig] = useState(
        behandling.feilutbetaltValuta.length > 0
    );
    const [erUlagretNyFeilutbetaltValutaPeriode, settErUlagretNyFeilutbetaltValutaPeriode] = useState(false);

    const visFeilutbetaltValutaTabell = useCallback(() => {
        settErFeilutbetaltValutaTabellSynlig(true);
    }, [settErFeilutbetaltValutaTabellSynlig]);

    const skjulFeilutbetaltValutaTabell = useCallback(() => {
        settErFeilutbetaltValutaTabellSynlig(false);
    }, [settErFeilutbetaltValutaTabellSynlig]);

    return (
        <FeilutbetaltValutaTabellContext.Provider
            value={{
                erFeilutbetaltValutaTabellSynlig,
                visFeilutbetaltValutaTabell,
                skjulFeilutbetaltValutaTabell,
                erUlagretNyFeilutbetaltValutaPeriode,
                settErUlagretNyFeilutbetaltValutaPeriode,
            }}
        >
            {children}
        </FeilutbetaltValutaTabellContext.Provider>
    );
}

export function useFeilutbetaltValutaTabellContext() {
    const context = useContext(FeilutbetaltValutaTabellContext);
    if (context === undefined) {
        throw new Error('useFeilutbetaltValutaTabellContext må brukes innenfor en FeilutbetaltValutaTabellProvider');
    }
    return context;
}
