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
    erUlagretNyFeilutbetaltValutaPeriode: boolean; // TODO: Erstatt med erLeggTilFeilutbetaltValutaFormÅpen når toggelen "brukNyFeilutbetaltValutaSkjema" er slettet
    settErUlagretNyFeilutbetaltValutaPeriode: Dispatch<SetStateAction<boolean>>; // TODO: Slett når toggelen "brukNyFeilutbetaltValutaSkjema" er slettet
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
    const [erUlagretNyFeilutbetaltValutaPeriode, settErUlagretNyFeilutbetaltValutaPeriode] = useState(false);
    const [erLeggTilFeilutbetaltValutaFormÅpen, settErLeggTilFeilutbetaltValutaFormÅpen] = useState(false);

    const visLeggTilFeilutbetaltValutaForm = useCallback(() => {
        settErLeggTilFeilutbetaltValutaFormÅpen(true);
        settErUlagretNyFeilutbetaltValutaPeriode(true);
    }, []);

    const skjulLeggTilFeilutbetaltValutaForm = useCallback(() => {
        settErLeggTilFeilutbetaltValutaFormÅpen(false);
        settErUlagretNyFeilutbetaltValutaPeriode(false);
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
                erUlagretNyFeilutbetaltValutaPeriode,
                settErUlagretNyFeilutbetaltValutaPeriode,
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
