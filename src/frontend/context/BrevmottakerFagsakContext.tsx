import React, { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

import type { SkjemaBrevmottaker } from '../sider/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

interface ManuelleBrevmottakerePåFagsakContext {
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
    settManuelleBrevmottakerePåFagsak: (brevmottakere: SkjemaBrevmottaker[]) => void;
}

const ManuelleBrevmottakerePåFagsakContext = createContext<
    ManuelleBrevmottakerePåFagsakContext | undefined
>(undefined);

export function ManuelleBrevmottakerePåFagsakProvider(props: PropsWithChildren) {
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
            {props.children}
        </ManuelleBrevmottakerePåFagsakContext.Provider>
    );
}

export function useManuelleBrevmottakerePåFagsakContext() {
    const context = useContext(ManuelleBrevmottakerePåFagsakContext);
    if (context === undefined) {
        throw new Error(
            'useBrevmottakerFagsakContext må brukes innenfor en BrevmottakerFagsakProvider'
        );
    }
    return context;
}
