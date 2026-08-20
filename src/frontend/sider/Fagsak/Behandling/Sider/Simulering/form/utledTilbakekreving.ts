import { type ITilbakekreving, Tilbakekrevingsvalg } from '@typer/simulering';
import type { IVedtakForBehandling } from '@typer/vedtak';
import type { TilbakekrevingFormValues } from './useTilbakekrevingForm';

export function utledTilbakekreving(
    values: TilbakekrevingFormValues,
    vedtak: IVedtakForBehandling | undefined,
    erFeilutbetaling: boolean
): ITilbakekreving | undefined {
    const { tilbakekrevingsvalg, fritekstVarsel, begrunnelse } = values;

    if (tilbakekrevingsvalg === '' || vedtak === undefined) {
        return undefined;
    }

    const skalSendeVarsel =
        erFeilutbetaling && tilbakekrevingsvalg === Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL;

    return {
        vedtakId: vedtak.id,
        valg: tilbakekrevingsvalg,
        begrunnelse: begrunnelse,
        varsel: skalSendeVarsel ? fritekstVarsel : undefined,
    };
}
