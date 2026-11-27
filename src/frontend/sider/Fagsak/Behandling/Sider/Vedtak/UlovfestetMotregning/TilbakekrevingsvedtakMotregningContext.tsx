import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface Props extends PropsWithChildren {
    tilbakekrevingsvedtakMotregning?: TilbakekrevingsvedtakMotregningDTO;
}

interface TilbakekrevingsvedtakMotregningContext {
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO | undefined;
}

const TilbakekrevingsvedtakMotregningContext = createContext<TilbakekrevingsvedtakMotregningContext | undefined>(
    undefined
);

export function TilbakekrevingsvedtakMotregningProvider({ tilbakekrevingsvedtakMotregning, children }: Props) {
    return (
        <TilbakekrevingsvedtakMotregningContext.Provider value={{ tilbakekrevingsvedtakMotregning }}>
            {children}
        </TilbakekrevingsvedtakMotregningContext.Provider>
    );
}

export function useTilbakekrevingsvedtakMotregningContext() {
    const context = useContext(TilbakekrevingsvedtakMotregningContext);
    if (context === undefined) {
        throw new Error(
            'useTilbakekrevingsvedtakMotregningContext må brukes innenfor en TilbakekrevingsvedtakMotregningProvider'
        );
    }
    return context;
}
