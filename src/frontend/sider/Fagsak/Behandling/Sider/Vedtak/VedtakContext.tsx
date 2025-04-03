import React, { useContext, useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';

interface Props extends React.PropsWithChildren {
    åpenBehandling: IBehandling;
}
interface VedtakContextValue {
    vedtaksperioderMedBegrunnelserRessurs: Ressurs<IVedtaksperiodeMedBegrunnelser[]>;
    settVedtaksperioderMedBegrunnelserRessurs: React.Dispatch<
        React.SetStateAction<Ressurs<IVedtaksperiodeMedBegrunnelser[]>>
    >;
    hentVedtaksperioder: () => void;
    visFeilutbetaltValuta: boolean;
    settVisFeilutbetaltValuta: React.Dispatch<React.SetStateAction<boolean>>;
    visRefusjonEøs: boolean;
    settVisRefusjonEøs: React.Dispatch<React.SetStateAction<boolean>>;
    erUlagretNyFeilutbetaltValutaPeriode: boolean;
    settErUlagretNyFeilutbetaltValutaPeriode: React.Dispatch<React.SetStateAction<boolean>>;
    erUlagretNyRefusjonEøsPeriode: boolean;
    settErUlagretNyRefusjonEøsPeriode: React.Dispatch<React.SetStateAction<boolean>>;
}

const VedtakContext = React.createContext<VedtakContextValue | undefined>(undefined);

export const VedtakProvider = ({ åpenBehandling, children }: Props) => {
    const { behandlingId } = useSakOgBehandlingParams();
    const { request } = useHttp();

    const [visFeilutbetaltValuta, settVisFeilutbetaltValuta] = useState(
        åpenBehandling.feilutbetaltValuta.length > 0
    );
    const [visRefusjonEøs, settVisRefusjonEøs] = useState(åpenBehandling.refusjonEøs.length > 0);

    const [erUlagretNyFeilutbetaltValutaPeriode, settErUlagretNyFeilutbetaltValutaPeriode] =
        useState(false);

    const [erUlagretNyRefusjonEøsPeriode, settErUlagretNyRefusjonEøsPeriode] = useState(false);

    useEffect(() => {
        settVisFeilutbetaltValuta(åpenBehandling.feilutbetaltValuta.length > 0);
        settVisRefusjonEøs(åpenBehandling.refusjonEøs.length > 0);
    }, [åpenBehandling]);

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
                visFeilutbetaltValuta,
                settVisFeilutbetaltValuta,
                visRefusjonEøs,
                settVisRefusjonEøs,
                erUlagretNyFeilutbetaltValutaPeriode,
                settErUlagretNyFeilutbetaltValutaPeriode,
                erUlagretNyRefusjonEøsPeriode,
                settErUlagretNyRefusjonEøsPeriode,
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
