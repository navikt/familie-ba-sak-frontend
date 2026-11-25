import type { IRestKorrigertVedtak } from '@typer/vedtak';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface Props extends PropsWithChildren {
    korrigertVedtak?: IRestKorrigertVedtak;
}

interface KorrigertVedtakContext {
    korrigertVedtak: IRestKorrigertVedtak | undefined;
}

const KorrigertVedtakContext = createContext<KorrigertVedtakContext | undefined>(undefined);

export function KorrigertVedtakProvider({ korrigertVedtak, children }: Props) {
    return <KorrigertVedtakContext.Provider value={{ korrigertVedtak }}>{children}</KorrigertVedtakContext.Provider>;
}

export function useKorrigertVedtakContext() {
    const context = useContext(KorrigertVedtakContext);
    if (context === undefined) {
        throw new Error('useKorrigertVedtakContext må brukes innenfor en KorrigertVedtakProvider');
    }
    return context;
}
