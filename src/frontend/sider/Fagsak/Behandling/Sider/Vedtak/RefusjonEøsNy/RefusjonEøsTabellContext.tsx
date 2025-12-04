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

interface RefusjonEøsTabellContext {
    erRefusjonEøsTabellSynlig: boolean;
    visRefusjonEøsTabell: () => void;
    skjulRefusjonEøsTabell: () => void;
    erUlagretNyRefusjonEøsPeriode: boolean; // TODO: Erstatt med erLeggTilRefusjonEøsFormÅpen når toggelen "brukNyRefusjonEøsForm" er slettet
    settErUlagretNyRefusjonEøsPeriode: Dispatch<SetStateAction<boolean>>; // TODO: Slett når toggelen "brukNyRefusjonEøsForm" er slettet
    erLeggTilRefusjonEøsFormÅpen: boolean;
    visLeggTilRefusjonEøsForm: () => void;
    skjulLeggTilRefusjonEøsForm: () => void;
}

const RefusjonEøsTabellContext = createContext<RefusjonEøsTabellContext | undefined>(undefined);

export function RefusjonEøsTabellProvider({ children }: PropsWithChildren) {
    const { behandling } = useBehandlingContext();

    const harRefusjonEøs = behandling.refusjonEøs.length !== 0;

    const [erRefusjonEøsTabellSynlig, settErRefusjonEøsTabellSynlig] = useState(harRefusjonEøs);
    const [erUlagretNyRefusjonEøsPeriode, settErUlagretNyRefusjonEøsPeriode] = useState(false);
    const [erLeggTilRefusjonEøsFormÅpen, settErLeggTilRefusjonEøsFormÅpen] = useState(false);

    const visLeggTilRefusjonEøsForm = useCallback(() => {
        settErLeggTilRefusjonEøsFormÅpen(true);
        settErUlagretNyRefusjonEøsPeriode(true);
    }, []);

    const skjulLeggTilRefusjonEøsForm = useCallback(() => {
        settErLeggTilRefusjonEøsFormÅpen(false);
        settErUlagretNyRefusjonEøsPeriode(false);
    }, []);

    const visRefusjonEøsTabell = useCallback(() => {
        if (!harRefusjonEøs) {
            visLeggTilRefusjonEøsForm();
        }
        settErRefusjonEøsTabellSynlig(true);
    }, [harRefusjonEøs, visLeggTilRefusjonEøsForm]);

    const skjulRefusjonEøsTabell = useCallback(() => {
        skjulLeggTilRefusjonEøsForm();
        settErRefusjonEøsTabellSynlig(false);
    }, [skjulLeggTilRefusjonEøsForm]);

    return (
        <RefusjonEøsTabellContext.Provider
            value={{
                erRefusjonEøsTabellSynlig,
                visRefusjonEøsTabell,
                skjulRefusjonEøsTabell,
                erUlagretNyRefusjonEøsPeriode,
                settErUlagretNyRefusjonEøsPeriode,
                erLeggTilRefusjonEøsFormÅpen,
                visLeggTilRefusjonEøsForm,
                skjulLeggTilRefusjonEøsForm,
            }}
        >
            {children}
        </RefusjonEøsTabellContext.Provider>
    );
}

export function useRefusjonEøsTabellContext() {
    const context = useContext(RefusjonEøsTabellContext);
    if (context === undefined) {
        throw new Error('useRefusjonEøsTabellContext må brukes innenfor en RefusjonEøsTabellProvider');
    }
    return context;
}
