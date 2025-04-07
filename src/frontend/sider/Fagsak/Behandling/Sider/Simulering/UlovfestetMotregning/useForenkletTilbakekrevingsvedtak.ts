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
    ForenkletTilbakekrevingsvedtakDTO,
    OppdaterForenkletTilbakekrevingsvedtakFritekstDTO,
    OppdaterForenkletTilbakekrevingsvedtakSamtykkeDTO,
} from './ForenkletTilbakekrevingsvedtakDTO';
import type { IBehandling } from '../../../../../../typer/behandling';

export const useForenkletTilbakekrevingsvedtak = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();

    const forenkletTilbakekrevingsvedtakUrl = `/familie-ba-sak/api/behandling/${åpenBehandling.behandlingId}/forenklet-tilbakekrevingsvedtak`;

    const [forenkletTilbakekrevingsvedtak, settForenkletTilbakekrevingsvedtak] =
        useState<Ressurs<ForenkletTilbakekrevingsvedtakDTO | null>>(byggTomRessurs());

    const [heleBeløpetSkalKrevesTilbake, settHeleBeløpetSkalKrevesTilbake] =
        useState<boolean>(false);

    const hentForenkletTilbakekrevingsvedtak = () => {
        settForenkletTilbakekrevingsvedtak(byggHenterRessurs());
        request<void, ForenkletTilbakekrevingsvedtakDTO>({
            method: 'GET',
            url: forenkletTilbakekrevingsvedtakUrl,
        })
            .then((response: Ressurs<ForenkletTilbakekrevingsvedtakDTO>) => {
                settForenkletTilbakekrevingsvedtak(response);
            })
            .catch((_error: AxiosError) => {
                settForenkletTilbakekrevingsvedtak(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å hente forenklet tilbakekrevingsvedtak.'
                    )
                );
            });
    };

    const slettForenkletTilbakekrevingsvedtak = (): Promise<void> =>
        request<void, string>({
            method: 'DELETE',
            url: forenkletTilbakekrevingsvedtakUrl,
        })
            .then(response => {
                if (response.status === RessursStatus.SUKSESS) {
                    settForenkletTilbakekrevingsvedtak(byggDataRessurs(null));
                }
            })
            .catch((_error: AxiosError) => {
                settForenkletTilbakekrevingsvedtak(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å slette forenklet tilbakekrevingsvedtak.'
                    )
                );
            });

    const oppdaterForenkletTilbakekrevingFritekst = (fritekst: string): Promise<void> =>
        request<
            OppdaterForenkletTilbakekrevingsvedtakFritekstDTO,
            ForenkletTilbakekrevingsvedtakDTO
        >({
            method: 'PATCH',
            data: { fritekst: fritekst },
            url: `${forenkletTilbakekrevingsvedtakUrl}/fritekst`,
        })
            .then((response: Ressurs<ForenkletTilbakekrevingsvedtakDTO>) => {
                settForenkletTilbakekrevingsvedtak(response);
            })
            .catch((_error: AxiosError) => {
                settForenkletTilbakekrevingsvedtak(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å oppdatere fritekst i forenklet tilbakekrevingsvedtak.'
                    )
                );
            });

    const oppdaterForenkletTilbakekrevingSamtykke = (samtykke: boolean): Promise<void> =>
        request<
            OppdaterForenkletTilbakekrevingsvedtakSamtykkeDTO,
            ForenkletTilbakekrevingsvedtakDTO
        >({
            method: 'PATCH',
            data: { samtykke: samtykke },
            url: `${forenkletTilbakekrevingsvedtakUrl}/samtykke`,
        })
            .then((response: Ressurs<ForenkletTilbakekrevingsvedtakDTO>) => {
                settForenkletTilbakekrevingsvedtak(response);
            })
            .catch((_error: AxiosError) => {
                settForenkletTilbakekrevingsvedtak(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å oppdatere samtykke i forenklet tilbakekrevingsvedtak.'
                    )
                );
            });

    useEffect(() => {
        hentForenkletTilbakekrevingsvedtak();
    }, [åpenBehandling]);

    return {
        forenkletTilbakekrevingsvedtak,
        slettForenkletTilbakekrevingsvedtak,
        oppdaterForenkletTilbakekrevingFritekst,
        oppdaterForenkletTilbakekrevingSamtykke,
        heleBeløpetSkalKrevesTilbake,
        settHeleBeløpetSkalKrevesTilbake,
    };
};
