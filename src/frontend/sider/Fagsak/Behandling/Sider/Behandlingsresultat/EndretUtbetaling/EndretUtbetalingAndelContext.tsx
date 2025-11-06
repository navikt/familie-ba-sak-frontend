import React, { createContext, type PropsWithChildren, useContext } from 'react';

import type { IRestEndretUtbetalingAndel } from '../../../../../../typer/utbetalingAndel';

interface Props extends PropsWithChildren {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

interface EndretUtbetalingAndelContextValue {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

const EndretUtbetalingAndelContext = createContext<EndretUtbetalingAndelContextValue | undefined>(undefined);

export const EndretUtbetalingAndelProvider = ({ endretUtbetalingAndel, children }: Props) => {
    return (
        <EndretUtbetalingAndelContext.Provider value={{ endretUtbetalingAndel }}>
            {children}
        </EndretUtbetalingAndelContext.Provider>
    );
};

export const useEndretUtbetalingAndelContext = () => {
    const context = useContext(EndretUtbetalingAndelContext);

    if (context === undefined) {
        throw new Error('useEndretUtbetalingAndelContext må brukes innenfor en EndretUtbetalingAndelProvider');
    }

    return context;
};
