import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';

export function lagTilbakekrevingsvedtakMotregning(
    tilbakekrevingsvedtakMotregning?: Partial<TilbakekrevingsvedtakMotregningDTO>
): TilbakekrevingsvedtakMotregningDTO {
    return {
        årsakTilFeilutbetaling: null,
        vurderingAvSkyld: null,
        varselDato: '2026-01-15',
        samtykke: false,
        heleBeløpetSkalKrevesTilbake: false,
        ...tilbakekrevingsvedtakMotregning,
    };
}

export * as TilbakekrevingsvedtakMotregningTestdata from './tilbakekrevingsvedtakMotregningTestdata';
