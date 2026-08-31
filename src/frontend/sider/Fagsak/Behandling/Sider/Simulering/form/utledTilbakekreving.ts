import { type ITilbakekreving, Tilbakekrevingsvalg } from '@typer/simulering';
import type { IVedtakForBehandling } from '@typer/vedtak';
import { erDefinert } from '@utils/commons';
import type { TilbakekrevingFormValues } from './useTilbakekrevingForm';

export function utledTilbakekreving(
    values: TilbakekrevingFormValues,
    vedtak: IVedtakForBehandling | undefined | null,
    erFeilutbetaling: boolean
): ITilbakekreving | undefined {
    const { tilbakekrevingsvalg, fritekstVarsel, begrunnelse } = values;

    if (tilbakekrevingsvalg === '' || !erDefinert(vedtak)) {
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
