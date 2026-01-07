import React, { createContext, type PropsWithChildren, useCallback, useContext, useState } from 'react';

import { useBehandlingContext } from '../../../context/BehandlingContext';

interface FeilutbetaltValutaTabellContext {
    erFeilutbetaltValutaTabellSynlig: boolean;
    visFeilutbetaltValutaTabell: () => void;
    skjulFeilutbetaltValutaTabell: () => void;
    erLeggTilFeilutbetaltValutaFormÅpen: boolean;
    visLeggTilFeilutbetaltValutaForm: () => void;
    skjulLeggTilFeilutbetaltValutaForm: () => void;
}

const FeilutbetaltValutaTabellContext = createContext<FeilutbetaltValutaTabellContext | undefined>(undefined);

export function FeilutbetaltValutaTabellProvider({ children }: PropsWithChildren) {
    const { behandling } = useBehandlingContext();

    const harFeilutbetaltValuta = behandling.feilutbetaltValuta.length !== 0;

    const [erFeilutbetaltValutaTabellSynlig, settErFeilutbetaltValutaTabellSynlig] = useState(
        behandling.feilutbetaltValuta.length > 0
    );
    const [erLeggTilFeilutbetaltValutaFormÅpen, settErLeggTilFeilutbetaltValutaFormÅpen] = useState(false);

    const visLeggTilFeilutbetaltValutaForm = useCallback(() => {
        settErLeggTilFeilutbetaltValutaFormÅpen(true);
    }, []);

    const skjulLeggTilFeilutbetaltValutaForm = useCallback(() => {
        settErLeggTilFeilutbetaltValutaFormÅpen(false);
    }, []);

    const visFeilutbetaltValutaTabell = useCallback(() => {
        if (!harFeilutbetaltValuta) {
            visLeggTilFeilutbetaltValutaForm();
        }
        settErFeilutbetaltValutaTabellSynlig(true);
    }, [harFeilutbetaltValuta, visLeggTilFeilutbetaltValutaForm]);

    const skjulFeilutbetaltValutaTabell = useCallback(() => {
        skjulLeggTilFeilutbetaltValutaForm();
        settErFeilutbetaltValutaTabellSynlig(false);
    }, [skjulLeggTilFeilutbetaltValutaForm]);

    return (
        <FeilutbetaltValutaTabellContext.Provider
            value={{
                erFeilutbetaltValutaTabellSynlig,
                visFeilutbetaltValutaTabell,
                skjulFeilutbetaltValutaTabell,
                erLeggTilFeilutbetaltValutaFormÅpen,
                visLeggTilFeilutbetaltValutaForm,
                skjulLeggTilFeilutbetaltValutaForm,
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
