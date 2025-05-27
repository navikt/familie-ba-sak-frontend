export interface TilbakekrevingsvedtakMotregningDTO {
    årsakTilFeilutbetaling: string | null;
    vurderingAvSkyld: string | null;
    varselDato: string;
    samtykke: boolean;
    heleBeløpetSkalKrevesTilbake: boolean;
}

export interface OppdaterTilbakekrevingsvedtakMotregningDTO {
    årsakTilFeilutbetaling?: string;
    vurderingAvSkyld?: string;
    varselDato?: string;
    samtykke?: boolean;
    heleBeløpetSkalKrevesTilbake?: boolean;
}
