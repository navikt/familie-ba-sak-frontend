import { useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../typer/behandling';

export enum PeriodetypeIVedtaksbrev {
    MED_PERIODER = 'MED_PERIODER',
    UTEN_PERIODER = 'UTEN_PERIODER',
}

export const mapPeriodetypeIVedtaksbrevTilBoolean: Record<PeriodetypeIVedtaksbrev, boolean> = {
    MED_PERIODER: true,
    UTEN_PERIODER: false,
};

interface IProps {
    åpenBehandling: IBehandling;
}

export const useVedtak = ({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const startverdiPeriodetype =
        åpenBehandling.vedtak?.vedtaksperioderMedBegrunnelser.length === 1 &&
        åpenBehandling.vedtak.vedtaksperioderMedBegrunnelser.at(0)?.fom === null
            ? PeriodetypeIVedtaksbrev.UTEN_PERIODER
            : PeriodetypeIVedtaksbrev.MED_PERIODER;

    const [periodetypeIVedtaksbrev, settPeriodetypeIVedtaksbrev] =
        useState<PeriodetypeIVedtaksbrev>(startverdiPeriodetype);

    interface IOverstyrFortsattInnvilgetVedtaksperioder {
        skalGenererePerioderForFortsattInnvilget: boolean;
        behandlingId: number;
    }

    const overstyrFortsattInnvilgetVedtaksperioder = (
        periodetypeIVedtaksbrev: PeriodetypeIVedtaksbrev
    ) => {
        request<IOverstyrFortsattInnvilgetVedtaksperioder, IBehandling>({
            method: 'PUT',
            url: '/familie-ba-sak/api/vedtaksperioder/overstyr-fortsatt-innvilget-vedtaksperioder',
            data: {
                skalGenererePerioderForFortsattInnvilget:
                    mapPeriodetypeIVedtaksbrevTilBoolean[periodetypeIVedtaksbrev],
                behandlingId: åpenBehandling.behandlingId,
            },
        }).then((behandling: Ressurs<IBehandling>) => {
            if (behandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(behandling);
                settPeriodetypeIVedtaksbrev(periodetypeIVedtaksbrev);
            }
        });
    };

    return {
        overstyrFortsattInnvilgetVedtaksperioder,
        periodetypeIVedtaksbrev,
    };
};
