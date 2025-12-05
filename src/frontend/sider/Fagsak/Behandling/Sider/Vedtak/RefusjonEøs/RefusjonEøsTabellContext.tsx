import React, { createContext, type PropsWithChildren, useCallback, useContext, useState } from 'react';

import { useBehandlingContext } from '../../../context/BehandlingContext';

interface RefusjonEøsTabellContext {
    erRefusjonEøsTabellSynlig: boolean;
    visRefusjonEøsTabell: () => void;
    skjulRefusjonEøsTabell: () => void;
    erLeggTilRefusjonEøsFormÅpen: boolean;
    visLeggTilRefusjonEøsForm: () => void;
    skjulLeggTilRefusjonEøsForm: () => void;
}

const RefusjonEøsTabellContext = createContext<RefusjonEøsTabellContext | undefined>(undefined);

export function RefusjonEøsTabellProvider({ children }: PropsWithChildren) {
    const { behandling } = useBehandlingContext();

    const harRefusjonEøs = behandling.refusjonEøs.length !== 0;

    const [erRefusjonEøsTabellSynlig, settErRefusjonEøsTabellSynlig] = useState(harRefusjonEøs);
    const [erLeggTilRefusjonEøsFormÅpen, settErLeggTilRefusjonEøsFormÅpen] = useState(false);

    const visLeggTilRefusjonEøsForm = useCallback(() => {
        settErLeggTilRefusjonEøsFormÅpen(true);
    }, []);

    const skjulLeggTilRefusjonEøsForm = useCallback(() => {
        settErLeggTilRefusjonEøsFormÅpen(false);
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
