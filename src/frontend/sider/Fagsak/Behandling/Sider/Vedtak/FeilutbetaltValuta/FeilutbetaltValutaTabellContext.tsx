import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface FeilutbetaltValutaTabellContext {
    feilutbetaltValutaPerioder: IRestFeilutbetaltValuta[];
    erFeilutbetaltValutaTabellSynlig: boolean;
    erLeggTilFeilutbetaltValutaFormÅpen: boolean;
    visLeggTilFeilutbetaltValutaForm: () => void;
    skjulLeggTilFeilutbetaltValutaForm: () => void;
}

const FeilutbetaltValutaTabellContext = createContext<FeilutbetaltValutaTabellContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    feilutbetaltValutaPerioder: IRestFeilutbetaltValuta[];
}

export function FeilutbetaltValutaTabellProvider({ feilutbetaltValutaPerioder, children }: Props) {
    const [erLeggTilFeilutbetaltValutaFormÅpen, settErLeggTilFeilutbetaltValutaFormÅpen] = useState(false);

    const erFeilutbetaltValutaTabellSynlig =
        feilutbetaltValutaPerioder.length > 0 || erLeggTilFeilutbetaltValutaFormÅpen;

    const visLeggTilFeilutbetaltValutaForm = useCallback(() => {
        settErLeggTilFeilutbetaltValutaFormÅpen(true);
    }, []);

    const skjulLeggTilFeilutbetaltValutaForm = useCallback(() => {
        settErLeggTilFeilutbetaltValutaFormÅpen(false);
    }, []);

    return (
        <FeilutbetaltValutaTabellContext.Provider
            value={{
                feilutbetaltValutaPerioder,
                erFeilutbetaltValutaTabellSynlig,
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
