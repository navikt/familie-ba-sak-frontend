import { useHttp } from '@navikt/familie-http';

import type { OppdaterTilbakekrevingsvedtakMotregningDTO } from './TilbakekrevingsvedtakMotregningDTO';
import type { IBehandling } from '../../../../../../typer/behandling';
import { useBehandlingContext } from '../../../context/BehandlingContext';

export const dagerFristForAvventerSamtykkeUlovfestetMotregning = 14;

export const useTilbakekrevingsvedtakMotregning = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();
    const { settÅpenBehandling, hentLogg } = useBehandlingContext();

    const tilbakekrevingsvedtakMotregningUrl = `/familie-ba-sak/api/behandling/${åpenBehandling.behandlingId}/tilbakekrevingsvedtak-motregning`;

    const slettTilbakekrevingsvedtakMotregning = (): Promise<void> =>
        request<void, IBehandling>({
            method: 'DELETE',
            url: tilbakekrevingsvedtakMotregningUrl,
            påvirkerSystemLaster: true,
        }).then(behandling => {
            settÅpenBehandling(behandling);
            hentLogg();
        });

    const oppdaterTilbakekrevingsvedtakMotregning = (
        tilbakekrevingsvedtakMotregning: OppdaterTilbakekrevingsvedtakMotregningDTO
    ): Promise<void> =>
        request<OppdaterTilbakekrevingsvedtakMotregningDTO, IBehandling>({
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
        }).then(behandling => {
            settÅpenBehandling(behandling);
            hentLogg();
        });

    return {
        slettTilbakekrevingsvedtakMotregning,
        oppdaterTilbakekrevingsvedtakMotregning,
    };
};
