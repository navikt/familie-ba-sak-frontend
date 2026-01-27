import React, { type PropsWithChildren, useContext, useEffect, useState } from 'react';

import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import { useBegrunnelseApi } from '../../../../../api/useBegrunnelseApi';
import type { AlleBegrunnelser } from '../../../../../typer/vilkår';

interface VedtakContextValue {
    alleBegrunnelserRessurs: Ressurs<AlleBegrunnelser>;
}

const VedtakContext = React.createContext<VedtakContextValue | undefined>(undefined);

export const VedtakProvider = ({ children }: PropsWithChildren) => {
    const { hentAlleBegrunnelser } = useBegrunnelseApi();

    const [alleBegrunnelserRessurs, settAlleBegrunnelserRessurs] =
        useState<Ressurs<AlleBegrunnelser>>(byggTomRessurs());

    useEffect(() => {
        hentAlleBegrunnelser().then((data: Ressurs<AlleBegrunnelser>) => {
            settAlleBegrunnelserRessurs(data);
        });
    }, []);

    return (
        <VedtakContext.Provider
            value={{
                alleBegrunnelserRessurs,
            }}
        >
            {children}
        </VedtakContext.Provider>
    );
};

export const useVedtakContext = () => {
    const context = useContext(VedtakContext);

    if (!context) {
        throw new Error('useVedtakContext må brukes innenfor en VedtakProvider');
    }

    return context;
};
