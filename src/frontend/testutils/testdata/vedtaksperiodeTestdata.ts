import { YtelseType } from '@typer/beregning';
import type {
    IUtbetalingsperiodeDetalj,
    IVedtaksperiodeMedBegrunnelser,
    Utbetalingsperiode,
} from '@typer/vedtaksperiode';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';

import { lagGrunnlagPerson } from './personTestdata';

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

export function lagUtbetalingsperiodeDetalj(
    utbetalingsperiodeDetalj: Partial<IUtbetalingsperiodeDetalj> = {}
): IUtbetalingsperiodeDetalj {
    return {
        person: lagGrunnlagPerson(),
        ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
        utbetaltPerMnd: 1968,
        erPåvirketAvEndring: false,
        endringsårsak: undefined,
        ...utbetalingsperiodeDetalj,
    };
}

export function lagUtbetalingsperiode(utbetalingsperiode: Partial<Utbetalingsperiode> = {}): Utbetalingsperiode {
    const utbetalingsperiodeDetaljer = utbetalingsperiode.utbetalingsperiodeDetaljer ?? [lagUtbetalingsperiodeDetalj()];
    return {
        periodeFom: '2020-01-01',
        periodeTom: undefined,
        vedtaksperiodetype: Vedtaksperiodetype.UTBETALING,
        utbetalingsperiodeDetaljer,
        ytelseTyper: utbetalingsperiodeDetaljer.map(detalj => detalj.ytelseType),
        antallBarn: utbetalingsperiodeDetaljer.length,
        utbetaltPerMnd: utbetalingsperiodeDetaljer.reduce((sum, detalj) => sum + detalj.utbetaltPerMnd, 0),
        ...utbetalingsperiode,
    };
}

export * as VedtaksperiodeTestdata from './vedtaksperiodeTestdata';
