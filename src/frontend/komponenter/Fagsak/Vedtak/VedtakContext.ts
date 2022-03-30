import { useState } from 'react';

import createUseContext from 'constate';

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

const [VedtakProvider, useVedtak] = createUseContext(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const startverdiPeriodetype =
        åpenBehandling.vedtak?.vedtaksperioderMedBegrunnelser.length === 1 &&
        åpenBehandling.vedtak.vedtaksperioderMedBegrunnelser.at(0)?.fom === null
            ? PeriodetypeIVedtaksbrev.UTEN_PERIODER
            : PeriodetypeIVedtaksbrev.MED_PERIODER;

    const [periodetypeIVedtaksbrev, settperiodetypeIVedtaksbrev] =
        useState<PeriodetypeIVedtaksbrev>(startverdiPeriodetype);

    interface IOppdaterVedtaksperioder {
        skalGenererePerioderForFortsattInnvilget: boolean;
        behandlingId: number;
    }

    const oppdaterVedtaksperioder = (periodetypeIVedtaksbrev: PeriodetypeIVedtaksbrev) => {
        request<IOppdaterVedtaksperioder, IBehandling>({
            method: 'PUT',
            url: '/familie-ba-sak/api/vedtaksperioder/fortsatt-innvilget',
            data: {
                skalGenererePerioderForFortsattInnvilget:
                    mapPeriodetypeIVedtaksbrevTilBoolean[periodetypeIVedtaksbrev],
                behandlingId: åpenBehandling.behandlingId,
            },
        }).then((behandling: Ressurs<IBehandling>) => {
            if (behandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(behandling);
                settperiodetypeIVedtaksbrev(periodetypeIVedtaksbrev);
            }
        });
    };

    return {
        oppdaterVedtaksperioder,
        periodetypeIVedtaksbrev,
    };
});

export { VedtakProvider, useVedtak };
