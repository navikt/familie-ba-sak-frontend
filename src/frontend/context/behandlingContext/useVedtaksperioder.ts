import { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IVedtaksperiodeMedBegrunnelser } from '../../typer/vedtaksperiode';

export const [VedtaksperioderProvider, useVedtaksperioder] = constate(() => {
    const { behandlingId } = useSakOgBehandlingParams();
    const { request } = useHttp();

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

    return { vedtaksperioderMedBegrunnelserRessurs, hentVedtaksperioder };
});
