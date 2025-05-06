import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import {
    byggDataRessurs,
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

    const hentTilbakekrevingsvedtakMotregning = () => {
        settTilbakekrevingsvedtakMotregning(byggHenterRessurs());
        request<void, TilbakekrevingsvedtakMotregningDTO>({
            method: 'GET',
            url: tilbakekrevingsvedtakMotregningUrl,
            påvirkerSystemLaster: true,
        }).then((response: Ressurs<TilbakekrevingsvedtakMotregningDTO>) => {
            settTilbakekrevingsvedtakMotregning(response);
        });
    };

    const slettTilbakekrevingsvedtakMotregning = (): Promise<void> =>
        request<void, string>({
            method: 'DELETE',
            url: tilbakekrevingsvedtakMotregningUrl,
            påvirkerSystemLaster: true,
        }).then(response => {
            if (response.status === RessursStatus.SUKSESS) {
                settTilbakekrevingsvedtakMotregning(byggDataRessurs(null));
            }
        });

    const oppdaterTilbakekrevingsvedtakMotregning = (
        tilbakekrevingsvedtakMotregning: OppdaterTilbakekrevingsvedtakMotregningDTO
    ): Promise<void> =>
        request<OppdaterTilbakekrevingsvedtakMotregningDTO, TilbakekrevingsvedtakMotregningDTO>({
            method: 'PATCH',
            url: tilbakekrevingsvedtakMotregningUrl,
            påvirkerSystemLaster: true,
            data: {
                årsakTilFeilutbetaling: tilbakekrevingsvedtakMotregning.årsakTilFeilutbetaling,
                vurderingAvSkyld: tilbakekrevingsvedtakMotregning.vurderingAvSkyld,
                varselDato: tilbakekrevingsvedtakMotregning.varselDato,
                samtykke: tilbakekrevingsvedtakMotregning.samtykke,
                heleBeløpetSkalKrevesTilbake:
                    tilbakekrevingsvedtakMotregning.heleBeløpetSkalKrevesTilbake,
            },
        }).then((response: Ressurs<TilbakekrevingsvedtakMotregningDTO>) => {
            settTilbakekrevingsvedtakMotregning(response);
        });

    useEffect(() => {
        if (toggles[ToggleNavn.brukFunksjonalitetForUlovfestetMotregning]) {
            hentTilbakekrevingsvedtakMotregning();
        }
    }, [åpenBehandling]);

    return {
        tilbakekrevingsvedtakMotregning,
        slettTilbakekrevingsvedtakMotregning,
        oppdaterTilbakekrevingsvedtakMotregning,
    };
};
