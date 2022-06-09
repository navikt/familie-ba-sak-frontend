import type { FamilieIsoDate } from '../utils/kalender';
import { ytelsetype, YtelseType } from './beregning';
import type { IGrunnlagPerson } from './person';
import type { VedtakBegrunnelse, VedtakBegrunnelseType } from './vedtak';

export interface IVedtaksperiodeMedBegrunnelser {
    id: number;
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
    type: Vedtaksperiodetype;
    begrunnelser: IRestVedtaksbegrunnelse[];
    fritekster: string[];
    gyldigeBegrunnelser: VedtakBegrunnelse[];
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

export interface IRestVedtaksbegrunnelse {
    standardbegrunnelse: VedtakBegrunnelse;
    vedtakBegrunnelseType: VedtakBegrunnelseType;
}

export interface IRestPutVedtaksperiodeMedFritekster {
    fritekster: string[];
}

export enum Vedtaksperiodetype {
    UTBETALING = 'UTBETALING',
    UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING = 'UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING',
    OPPHØR = 'OPPHØR',
    AVSLAG = 'AVSLAG',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
    ENDRET_UTBETALING = 'ENDRET_UTBETALING',
}

export type Vedtaksperiode =
    | {
          periodeFom: FamilieIsoDate;
          periodeTom?: FamilieIsoDate;
          vedtaksperiodetype: Vedtaksperiodetype.UTBETALING;
          utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
          ytelseTyper: YtelseType[];
          antallBarn: number;
          utbetaltPerMnd: number;
      }
    | {
          periodeFom: FamilieIsoDate;
          periodeTom?: FamilieIsoDate;
          vedtaksperiodetype: Vedtaksperiodetype.OPPHØR;
      }
    | {
          periodeFom?: FamilieIsoDate;
          periodeTom?: FamilieIsoDate;
          vedtaksperiodetype: Vedtaksperiodetype.AVSLAG;
      }
    | {
          periodeFom?: FamilieIsoDate;
          periodeTom?: FamilieIsoDate;
          vedtaksperiodetype: Vedtaksperiodetype.FORTSATT_INNVILGET;
          utbetalingsperiode: Vedtaksperiode;
      };

export type Utbetalingsperiode = {
    periodeFom: FamilieIsoDate;
    periodeTom?: FamilieIsoDate;
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
}

export const hentVedtaksperiodeTittel = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser
) => {
    const { type, utbetalingsperiodeDetaljer } = vedtaksperiodeMedBegrunnelser;

    const ytelseTyperUtenEndring =
        utbetalingsperiodeDetaljer
            .filter(utbetalingsperiodeDetalj => !utbetalingsperiodeDetalj.erPåvirketAvEndring)
            .map(utbetalingsperiodeDetalj => utbetalingsperiodeDetalj.ytelseType) ?? [];

    if (
        (type === Vedtaksperiodetype.UTBETALING ||
            type === Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING ||
            type === Vedtaksperiodetype.FORTSATT_INNVILGET) &&
        utbetalingsperiodeDetaljer.length > 0
    ) {
        if (
            ytelseTyperUtenEndring.includes(YtelseType.UTVIDET_BARNETRYGD) &&
            ytelseTyperUtenEndring.includes(YtelseType.SMÅBARNSTILLEGG)
        ) {
            return `${ytelsetype[YtelseType.UTVIDET_BARNETRYGD].navn} og ${ytelsetype[
                YtelseType.SMÅBARNSTILLEGG
            ].navn.toLowerCase()}`;
        } else if (ytelseTyperUtenEndring.includes(YtelseType.UTVIDET_BARNETRYGD)) {
            return ytelsetype[YtelseType.UTVIDET_BARNETRYGD].navn;
        } else {
            return ytelsetype[YtelseType.ORDINÆR_BARNETRYGD].navn;
        }
    }

    switch (type) {
        case Vedtaksperiodetype.ENDRET_UTBETALING:
            return 'Endret utbetalingsperiode';
        case Vedtaksperiodetype.OPPHØR:
            return 'Opphør';
        case Vedtaksperiodetype.AVSLAG:
            return 'Avslag';
        default:
            return '';
    }
};
