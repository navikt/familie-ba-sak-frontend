import { YtelseType } from './beregning';
import type { IGrunnlagPerson } from './person';
import type { IEndretUtbetalingAndelÅrsak } from './utbetalingAndel';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from './vedtak';
import type { IsoDatoString } from '../utils/dato';
export interface IVedtaksperiodeMedBegrunnelser {
    id: number;
    fom?: IsoDatoString;
    tom?: IsoDatoString;
    type: Vedtaksperiodetype;
    begrunnelser: IRestVedtaksbegrunnelse[];
    fritekster: string[];
    gyldigeBegrunnelser: VedtakBegrunnelse[];
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}
export interface IRestVedtaksbegrunnelse {
    standardbegrunnelse: VedtakBegrunnelse;
    vedtakBegrunnelseType: VedtakBegrunnelseType;
    støtterFritekst: boolean;
}
export interface IRestPutVedtaksperiodeMedFritekster {
    fritekster: string[];
}
export declare enum Vedtaksperiodetype {
    UTBETALING = "UTBETALING",
    UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING = "UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING",
    OPPHØR = "OPPH\u00D8R",
    AVSLAG = "AVSLAG",
    FORTSATT_INNVILGET = "FORTSATT_INNVILGET",
    ENDRET_UTBETALING = "ENDRET_UTBETALING"
}
export type Vedtaksperiode = {
    periodeFom: IsoDatoString;
    periodeTom?: IsoDatoString;
    vedtaksperiodetype: Vedtaksperiodetype.UTBETALING;
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
    ytelseTyper: YtelseType[];
    antallBarn: number;
    utbetaltPerMnd: number;
} | {
    periodeFom: IsoDatoString;
    periodeTom?: IsoDatoString;
    vedtaksperiodetype: Vedtaksperiodetype.OPPHØR;
} | {
    periodeFom?: IsoDatoString;
    periodeTom?: IsoDatoString;
    vedtaksperiodetype: Vedtaksperiodetype.AVSLAG;
} | {
    periodeFom?: IsoDatoString;
    periodeTom?: IsoDatoString;
    vedtaksperiodetype: Vedtaksperiodetype.FORTSATT_INNVILGET;
    utbetalingsperiode: Vedtaksperiode;
};
export type Utbetalingsperiode = {
    periodeFom: IsoDatoString;
    periodeTom?: IsoDatoString;
    vedtaksperiodetype: Vedtaksperiodetype.UTBETALING;
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
    ytelseTyper: YtelseType[];
    antallBarn: number;
    utbetaltPerMnd: number;
};
export interface IUtbetalingsperiodeDetalj {
    person: IGrunnlagPerson;
    ytelseType: YtelseType;
    utbetaltPerMnd: number;
    erPåvirketAvEndring: boolean;
    endringsårsak?: IEndretUtbetalingAndelÅrsak;
}
export interface IRestOverstyrtEndringstidspunkt {
    overstyrtEndringstidspunkt: IsoDatoString;
    behandlingId: number;
}
export declare const hentVedtaksperiodeTittel: (vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => string;
