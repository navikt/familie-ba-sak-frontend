import { Tilbakekrevingsvalg } from '@typer/simulering';
import type { IVedtakForBehandling } from '@typer/vedtak';
import { describe, expect, test } from 'vitest';
import { TilbakekrevingFormField, type TilbakekrevingFormValues } from './useTilbakekrevingForm';
import { utledTilbakekreving } from './utledTilbakekreving';

const vedtak: IVedtakForBehandling = { id: 42, aktiv: true, vedtaksdato: '2020-01-01' };

function lagFormValues(values: Partial<TilbakekrevingFormValues> = {}): TilbakekrevingFormValues {
    return {
        [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL,
        [TilbakekrevingFormField.FRITEKST_VARSEL]: '',
        [TilbakekrevingFormField.BEGRUNNELSE]: 'En begrunnelse',
        ...values,
    };
}

describe('utledTilbakekreving', () => {
    test('skal returnere undefined når det ikke er valgt et tilbakekrevingsvalg', () => {
        const values = lagFormValues({ [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: '' });

        const tilbakekreving = utledTilbakekreving(values, vedtak, true);

        expect(tilbakekreving).toBeUndefined();
    });

    test('skal returnere undefined når behandlingen mangler vedtak', () => {
        const tilbakekreving = utledTilbakekreving(lagFormValues(), undefined, true);

        expect(tilbakekreving).toBeUndefined();
    });

    test('skal sette vedtakId, valg og begrunnelse', () => {
        const values = lagFormValues({
            [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: Tilbakekrevingsvalg.IGNORER_TILBAKEKREVING,
            [TilbakekrevingFormField.BEGRUNNELSE]: 'Avventer tilbakekreving',
        });

        const tilbakekreving = utledTilbakekreving(values, vedtak, true);

        expect(tilbakekreving).toEqual({
            vedtakId: 42,
            valg: Tilbakekrevingsvalg.IGNORER_TILBAKEKREVING,
            begrunnelse: 'Avventer tilbakekreving',
            varsel: undefined,
        });
    });

    test('skal ta med fritekst i varselet når det skal sendes varsel', () => {
        const values = lagFormValues({
            [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL,
            [TilbakekrevingFormField.FRITEKST_VARSEL]: 'Fritekst til varselet',
        });

        const tilbakekreving = utledTilbakekreving(values, vedtak, true);

        expect(tilbakekreving?.varsel).toEqual('Fritekst til varselet');
    });

    test('skal ikke ta med fritekst i varselet når det ikke skal sendes varsel', () => {
        const values = lagFormValues({
            [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL,
            [TilbakekrevingFormField.FRITEKST_VARSEL]: 'Fritekst som ikke skal sendes',
        });

        const tilbakekreving = utledTilbakekreving(values, vedtak, true);

        expect(tilbakekreving?.varsel).toBeUndefined();
    });

    test('skal ikke ta med fritekst i varselet når simuleringen ikke har en feilutbetaling', () => {
        const values = lagFormValues({
            [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL,
            [TilbakekrevingFormField.FRITEKST_VARSEL]: 'Fritekst som ikke skal sendes',
        });

        const tilbakekreving = utledTilbakekreving(values, vedtak, false);

        expect(tilbakekreving?.varsel).toBeUndefined();
    });
});
