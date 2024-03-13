import { useEffect, useState } from 'react';
import * as React from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../typer/vedtaksperiode';

interface Props {
    åpenBehandling: IBehandling;
}

export const [VedtaksperioderProvider, useVedtaksperioder] = constate(
    ({ åpenBehandling }: Props) => {
        const { behandlingId } = useSakOgBehandlingParams();
        const { request } = useHttp();
        const [visFeilutbetaltValuta, settVisFeilutbetaltValuta] = React.useState(
            åpenBehandling.feilutbetaltValuta.length > 0
        );
        const [visRefusjonEøs, settVisRefusjonEøs] = React.useState(
            åpenBehandling.refusjonEøs.length > 0
        );
        const [erUlagretNyFeilutbetaltValutaPeriode, settErUlagretNyFeilutbetaltValutaPeriode] =
            React.useState(false);

        const [erUlagretNyRefusjonEøsPeriode, settErUlagretNyRefusjonEøsPeriode] =
            React.useState(false);

        React.useEffect(() => {
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

        return {
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
        };
    }
);
