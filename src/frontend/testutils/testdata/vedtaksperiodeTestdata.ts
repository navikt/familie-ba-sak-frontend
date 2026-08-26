import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';

export function lagVedtaksperiodeMedBegrunnelser(
    vedtaksperiode?: Partial<IVedtaksperiodeMedBegrunnelser>
): IVedtaksperiodeMedBegrunnelser {
    return {
        id: 1,
        type: Vedtaksperiodetype.UTBETALING,
        begrunnelser: [],
        fritekster: [],
        gyldigeBegrunnelser: [],
        utbetalingsperiodeDetaljer: [],
        ...vedtaksperiode,
    };
}

export * as VedtaksperiodeTestdata from './vedtaksperiodeTestdata';
