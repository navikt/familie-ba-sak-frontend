import React, { type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import { useBegrunnelseApi } from '../../../../../api/useBegrunnelseApi';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import type { AlleBegrunnelser } from '../../../../../typer/vilkår';
import { useBehandlingContext } from '../../context/BehandlingContext';

interface VedtakContextValue {
    vedtaksperioderMedBegrunnelserRessurs: Ressurs<IVedtaksperiodeMedBegrunnelser[]>;
    settVedtaksperioderMedBegrunnelserRessurs: React.Dispatch<
        React.SetStateAction<Ressurs<IVedtaksperiodeMedBegrunnelser[]>>
    >;
    hentVedtaksperioder: () => void;
    alleBegrunnelserRessurs: Ressurs<AlleBegrunnelser>;
}

const VedtakContext = React.createContext<VedtakContextValue | undefined>(undefined);

export const VedtakProvider = ({ children }: PropsWithChildren) => {
    const { behandling } = useBehandlingContext();
    const behandlingId = behandling.behandlingId;

    const { request } = useHttp();
    const { hentAlleBegrunnelser } = useBegrunnelseApi();

    const [alleBegrunnelserRessurs, settAlleBegrunnelserRessurs] =
        useState<Ressurs<AlleBegrunnelser>>(byggTomRessurs());

    useEffect(() => {
        hentAlleBegrunnelser().then((data: Ressurs<AlleBegrunnelser>) => {
            settAlleBegrunnelserRessurs(data);
        });
    }, []);

    const hentVedtaksperioder = () => {
        request<void, IVedtaksperiodeMedBegrunnelser[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/vedtaksperioder/behandling/${behandlingId}/hent-vedtaksperioder`,
            påvirkerSystemLaster: true,
        }).then(settVedtaksperioderMedBegrunnelserRessurs);
    };

    useEffect(() => {
        if (behandlingId) {
            hentVedtaksperioder();
        }
    }, [behandlingId]);

    const [vedtaksperioderMedBegrunnelserRessurs, settVedtaksperioderMedBegrunnelserRessurs] =
        useState<Ressurs<IVedtaksperiodeMedBegrunnelser[]>>(byggTomRessurs());

    return (
        <VedtakContext.Provider
            value={{
                vedtaksperioderMedBegrunnelserRessurs,
                settVedtaksperioderMedBegrunnelserRessurs,
                hentVedtaksperioder,
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
