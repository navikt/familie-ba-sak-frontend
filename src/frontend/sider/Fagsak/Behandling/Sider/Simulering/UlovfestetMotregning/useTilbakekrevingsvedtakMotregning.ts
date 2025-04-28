import { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    type Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import type {
    OppdaterTilbakekrevingsvedtakMotregningFritekstDTO,
    OppdaterTilbakekrevingsvedtakMotregningSamtykkeDTO,
    TilbakekrevingsvedtakMotregningDTO,
} from './TilbakekrevingsvedtakMotregningDTO';
import type { IBehandling } from '../../../../../../typer/behandling';

export const dagerFristForAvventerSamtykkeUlovfestetMotregning = 14;

export const useTilbakekrevingsvedtakMotregning = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();

    const tilbakekrevingsvedtakMotregningUrl = `/familie-ba-sak/api/behandling/${åpenBehandling.behandlingId}/forenklet-tilbakekrevingsvedtak`;

    const [tilbakekrevingsvedtakMotregning, settTilbakekrevingsvedtakMotregning] =
        useState<Ressurs<TilbakekrevingsvedtakMotregningDTO | null>>(byggTomRessurs());

    const [heleBeløpetSkalKrevesTilbake, settHeleBeløpetSkalKrevesTilbake] =
        useState<boolean>(false);

    const hentTilbakekrevingsvedtakMotregning = () => {
        settTilbakekrevingsvedtakMotregning(byggHenterRessurs());
        request<void, TilbakekrevingsvedtakMotregningDTO>({
            method: 'GET',
            url: tilbakekrevingsvedtakMotregningUrl,
        })
            .then((response: Ressurs<TilbakekrevingsvedtakMotregningDTO>) => {
                settTilbakekrevingsvedtakMotregning(response);
            })
            .catch((_error: AxiosError) => {
                settTilbakekrevingsvedtakMotregning(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å hente tilbakekrevingsvedtak for motregning.'
                    )
                );
            });
    };

    const slettTilbakekrevingsvedtakMotregning = (): Promise<void> =>
        request<void, string>({
            method: 'DELETE',
            url: tilbakekrevingsvedtakMotregningUrl,
        })
            .then(response => {
                if (response.status === RessursStatus.SUKSESS) {
                    settTilbakekrevingsvedtakMotregning(byggDataRessurs(null));
                }
            })
            .catch((_error: AxiosError) => {
                settTilbakekrevingsvedtakMotregning(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å slette tilbakekrevingsvedtak for motregning.'
                    )
                );
            });

    const oppdaterTilbakekrevingMotregningFritekst = (fritekst: string): Promise<void> =>
        request<
            OppdaterTilbakekrevingsvedtakMotregningFritekstDTO,
            TilbakekrevingsvedtakMotregningDTO
        >({
            method: 'PATCH',
            data: { fritekst: fritekst },
            url: `${tilbakekrevingsvedtakMotregningUrl}/fritekst`,
        })
            .then((response: Ressurs<TilbakekrevingsvedtakMotregningDTO>) => {
                settTilbakekrevingsvedtakMotregning(response);
            })
            .catch((_error: AxiosError) => {
                settTilbakekrevingsvedtakMotregning(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å oppdatere fritekst i tilbakekrevingsvedtak for motregning.'
                    )
                );
            });

    const oppdaterTilbakekrevingMotregningSamtykke = (samtykke: boolean): Promise<void> =>
        request<
            OppdaterTilbakekrevingsvedtakMotregningSamtykkeDTO,
            TilbakekrevingsvedtakMotregningDTO
        >({
            method: 'PATCH',
            data: { samtykke: samtykke },
            url: `${tilbakekrevingsvedtakMotregningUrl}/samtykke`,
        })
            .then((response: Ressurs<TilbakekrevingsvedtakMotregningDTO>) => {
                settTilbakekrevingsvedtakMotregning(response);
            })
            .catch((_error: AxiosError) => {
                settTilbakekrevingsvedtakMotregning(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å oppdatere samtykke i tilbakekrevingsvedtak for motregning.'
                    )
                );
            });

    useEffect(() => {
        hentTilbakekrevingsvedtakMotregning();
    }, [åpenBehandling]);

    return {
        tilbakekrevingsvedtakMotregning,
        slettTilbakekrevingsvedtakMotregning,
        oppdaterTilbakekrevingMotregningFritekst,
        oppdaterTilbakekrevingMotregningSamtykke,
        heleBeløpetSkalKrevesTilbake,
        settHeleBeløpetSkalKrevesTilbake,
    };
};
