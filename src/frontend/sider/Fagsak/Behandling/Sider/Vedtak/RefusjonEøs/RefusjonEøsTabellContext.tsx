import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';
import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface RefusjonEøsTabellContext {
    refusjonEøsPerioder: IRestRefusjonEøs[];
    erRefusjonEøsTabellSynlig: boolean;
    erLeggTilRefusjonEøsFormÅpen: boolean;
    visLeggTilRefusjonEøsForm: () => void;
    skjulLeggTilRefusjonEøsForm: () => void;
}

const RefusjonEøsTabellContext = createContext<RefusjonEøsTabellContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    refusjonEøsPerioder: IRestRefusjonEøs[];
}

export function RefusjonEøsTabellProvider({ refusjonEøsPerioder, children }: Props) {
    const [erLeggTilRefusjonEøsFormÅpen, settErLeggTilRefusjonEøsFormÅpen] = useState(false);

    const erRefusjonEøsTabellSynlig = refusjonEøsPerioder.length > 0 || erLeggTilRefusjonEøsFormÅpen;

    const visLeggTilRefusjonEøsForm = useCallback(() => {
        settErLeggTilRefusjonEøsFormÅpen(true);
    }, []);

    const skjulLeggTilRefusjonEøsForm = useCallback(() => {
        settErLeggTilRefusjonEøsFormÅpen(false);
    }, []);

    return (
        <RefusjonEøsTabellContext.Provider
            value={{
                refusjonEøsPerioder,
                erRefusjonEøsTabellSynlig,
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
