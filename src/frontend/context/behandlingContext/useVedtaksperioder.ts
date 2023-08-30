import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IVedtaksperiodeMedBegrunnelser } from '../../typer/vedtaksperiode';

export const useVedtaksperioder = () => {
    const { behandlingId } = useSakOgBehandlingParams();
    const { request } = useHttp();

    useEffect(() => {
        if (behandlingId) {
            request<void, IVedtaksperiodeMedBegrunnelser[]>({
                method: 'GET',
                url: `/familie-ba-sak/api/vedtaksperioder/behandling/${behandlingId}/hent-vedtaksperioder`,
                påvirkerSystemLaster: false,
            }).then(settVedtaksperioderMedBegrunnelserRessurs);
        }
    }, [behandlingId]);

    const [vedtaksperioderMedBegrunnelserRessurs, settVedtaksperioderMedBegrunnelserRessurs] =
        useState<Ressurs<IVedtaksperiodeMedBegrunnelser[]>>(byggTomRessurs());

    return { vedtaksperioderMedBegrunnelserRessurs };
};
