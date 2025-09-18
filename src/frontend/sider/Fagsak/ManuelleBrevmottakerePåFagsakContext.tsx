import React, { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

import type { SkjemaBrevmottaker } from './Fagsaklinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

interface ManuelleBrevmottakerePåFagsakContext {
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
    settManuelleBrevmottakerePåFagsak: (brevmottakere: SkjemaBrevmottaker[]) => void;
}

const ManuelleBrevmottakerePåFagsakContext = createContext<
    ManuelleBrevmottakerePåFagsakContext | undefined
>(undefined);

export function ManuelleBrevmottakerePåFagsakProvider({ children }: PropsWithChildren) {
    const [manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak] = useState<
        SkjemaBrevmottaker[]
    >([]);

    const value = useMemo(
        () => ({
            manuelleBrevmottakerePåFagsak,
            settManuelleBrevmottakerePåFagsak,
        }),
        [manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak]
    );

    return (
        <ManuelleBrevmottakerePåFagsakContext.Provider value={value}>
            {children}
        </ManuelleBrevmottakerePåFagsakContext.Provider>
    );
}

export function useManuelleBrevmottakerePåFagsakContext() {
    const context = useContext(ManuelleBrevmottakerePåFagsakContext);
    if (context === undefined) {
        throw new Error(
            'useManuelleBrevmottakerePåFagsakContext må brukes innenfor en ManuelleBrevmottakerePåFagsakProvider'
        );
    }
    return context;
}
