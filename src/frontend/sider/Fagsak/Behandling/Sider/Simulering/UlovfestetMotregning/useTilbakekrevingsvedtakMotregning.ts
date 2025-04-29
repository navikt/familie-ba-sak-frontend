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
    OppdaterTilbakekrevingsvedtakMotregningDTO,
    TilbakekrevingsvedtakMotregningDTO,
} from './TilbakekrevingsvedtakMotregningDTO';
import { useAppContext } from '../../../../../../context/AppContext';
import type { IBehandling } from '../../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../../typer/toggles';

export const dagerFristForAvventerSamtykkeUlovfestetMotregning = 14;

export const useTilbakekrevingsvedtakMotregning = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();
    const { toggles } = useAppContext();

    const tilbakekrevingsvedtakMotregningUrl = `/familie-ba-sak/api/behandling/${åpenBehandling.behandlingId}/tilbakekrevingsvedtak-motregning`;

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

    const oppdaterTilbakekrevingMotregning = (
        tilbakekrevingsvedtakMotregning: OppdaterTilbakekrevingsvedtakMotregningDTO
    ): Promise<void> =>
        request<OppdaterTilbakekrevingsvedtakMotregningDTO, TilbakekrevingsvedtakMotregningDTO>({
            method: 'PATCH',
            url: tilbakekrevingsvedtakMotregningUrl,
            data: {
                årsakTilFeilutbetaling: tilbakekrevingsvedtakMotregning.årsakTilFeilutbetaling,
                vurderingAvSkyld: tilbakekrevingsvedtakMotregning.vurderingAvSkyld,
                varselDato: tilbakekrevingsvedtakMotregning.varselDato,
                samtykke: tilbakekrevingsvedtakMotregning.samtykke,
            },
        })
            .then((response: Ressurs<TilbakekrevingsvedtakMotregningDTO>) => {
                settTilbakekrevingsvedtakMotregning(response);
            })
            .catch((_error: AxiosError) => {
                settTilbakekrevingsvedtakMotregning(
                    byggFeiletRessurs(
                        'Ukjent feil, klarte ikke å oppdatere tilbakekrevingsvedtak for motregning.'
                    )
                );
            });

    const bekreftSamtykkeTilMotregning = (): Promise<void> =>
        oppdaterTilbakekrevingMotregning({ samtykke: true });

    useEffect(() => {
        if (toggles[ToggleNavn.brukFunksjonalitetForUlovfestetMotregning]) {
            hentTilbakekrevingsvedtakMotregning();
        }
    }, [åpenBehandling]);

    return {
        tilbakekrevingsvedtakMotregning,
        slettTilbakekrevingsvedtakMotregning,
        oppdaterTilbakekrevingMotregning,
        bekreftSamtykkeTilMotregning,
        heleBeløpetSkalKrevesTilbake,
        settHeleBeløpetSkalKrevesTilbake,
    };
};
