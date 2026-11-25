import type { IRestKorrigertEtterbetaling } from '@typer/vedtak';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface Props extends PropsWithChildren {
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
}

interface KorrigertEtterbetalingContext {
    korrigertEtterbetaling: IRestKorrigertEtterbetaling | undefined;
}

const KorrigertEtterbetalingContext = createContext<KorrigertEtterbetalingContext | undefined>(undefined);

export function KorrigertEtterbetalingProvider({ korrigertEtterbetaling, children }: Props) {
    return (
        <KorrigertEtterbetalingContext.Provider value={{ korrigertEtterbetaling }}>
            {children}
        </KorrigertEtterbetalingContext.Provider>
    );
}

export function useKorrigertEtterbetalingContext() {
    const context = useContext(KorrigertEtterbetalingContext);
    if (context === undefined) {
        throw new Error('useKorrigertEtterbetalingContext må brukes innenfor en KorrigertEtterbetalingProvider');
    }
    return context;
}
