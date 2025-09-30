import React from 'react';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';

import type { IBarnMedOpplysninger } from '../../../typer/søknad';

interface Context {
    erModalÅpen: boolean;
    åpneModal: () => void;
    lukkModal: () => void;
    barn: IBarnMedOpplysninger[];
    onLeggTilBarn: (barn: IBarnMedOpplysninger) => void;
    harBrevmottaker: boolean;
}

interface Props extends PropsWithChildren {
    barn: IBarnMedOpplysninger[];
    onLeggTilBarn: (barn: IBarnMedOpplysninger) => void;
    harBrevmottaker: boolean;
}

const Context = createContext<Context | undefined>(undefined);

export function LeggTilBarnModalContextProvider({ barn, onLeggTilBarn, harBrevmottaker, children }: Props) {
    const [erModalÅpen, settErModalÅpen] = useState(false);

    function lukkModal() {
        settErModalÅpen(false);
    }

    function åpneModal() {
        settErModalÅpen(true);
    }

    return (
        <Context.Provider
            value={{
                erModalÅpen,
                lukkModal,
                åpneModal,
                barn,
                onLeggTilBarn,
                harBrevmottaker,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export function useLeggTilBarnModalContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useLeggTilBarnModalContext må brukes innenfor en LeggTilBarnModalContextProvider');
    }
    return context;
}
