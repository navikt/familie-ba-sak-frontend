import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import type { SkjemaBrevmottaker } from '../../komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

interface ManuelleBrevmottakerePåFagsakContext {
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
    settManuelleBrevmottakerePåFagsak: (brevmottakere: SkjemaBrevmottaker[]) => void;
}

const ManuelleBrevmottakerePåFagsakContext = createContext<ManuelleBrevmottakerePåFagsakContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    brevmottakere?: SkjemaBrevmottaker[];
}

export function ManuelleBrevmottakerePåFagsakProvider({ brevmottakere = [], children }: Props) {
    const [manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak] = useState(brevmottakere);

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
