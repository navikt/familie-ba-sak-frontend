import {
    erEtter,
    erFør,
    erSamme,
    FamilieIsoDate,
    IPeriode,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from '../utils/kalender';
import { IBehandling } from './behandling';
import { ytelsetype, YtelseType } from './beregning';
import { IGrunnlagPerson } from './person';
import { VedtakBegrunnelse, VedtakBegrunnelseType } from './vedtak';

// Vedtaksperioder med begrunnelser - POC på ny måte å samle begrunnelser knyttet til vedtaksperioder
export interface IVedtaksperiodeMedBegrunnelser {
    id: number;
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
    type: Vedtaksperiodetype;
    begrunnelser: IRestVedtaksbegrunnelse[];
    fritekster: string[];
}

export interface IRestVedtaksbegrunnelse {
    vedtakBegrunnelseSpesifikasjon: VedtakBegrunnelse;
    vedtakBegrunnelseType: VedtakBegrunnelseType;
    personIdenter: string[];
}

export interface IRestPutVedtaksbegrunnelse {
    vedtakBegrunnelseSpesifikasjon: VedtakBegrunnelse;
    personIdenter: string[];
}

export interface IRestPutVedtaksperiodeMedBegrunnelser {
    begrunnelser: IRestPutVedtaksbegrunnelse[];
    fritekster: string[];
}
// POC slutt

export enum Vedtaksperiodetype {
    UTBETALING = 'UTBETALING',
    OPPHØR = 'OPPHØR',
    AVSLAG = 'AVSLAG',
    FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
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

export const hentUtbetalingsperiodePåBehandlingOgPeriode = (
    periode: IPeriode,
    behandling: IBehandling
): Utbetalingsperiode | undefined => {
    const utbetalingsperioder = behandling.utbetalingsperioder;
    const periodeFom = kalenderDatoMedFallback(periode.fom, TIDENES_MORGEN);
    const periodeTom = kalenderDatoMedFallback(periode.tom, TIDENES_ENDE);

    const gjeldendeUtbetalingsperiode = utbetalingsperioder.find(utbetalingsperiode => {
        const utbetalingFom = kalenderDatoMedFallback(
            utbetalingsperiode.periodeFom,
            TIDENES_MORGEN
        );
        const utbetalingTom = kalenderDatoMedFallback(utbetalingsperiode.periodeTom, TIDENES_ENDE);
        return (
            (erSamme(utbetalingFom, periodeFom) || erEtter(utbetalingFom, periodeFom)) &&
            (erSamme(utbetalingTom, periodeTom) || erFør(utbetalingTom, periodeTom))
        );
    });

    if (gjeldendeUtbetalingsperiode?.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING) {
        return gjeldendeUtbetalingsperiode;
    } else {
        return undefined;
    }
};

export const hentUtbetalingsperiodeDetaljer = (
    vedtaksperiode?: Vedtaksperiode
): IUtbetalingsperiodeDetalj[] | undefined => {
    if (!vedtaksperiode) {
        return undefined;
    }

    switch (vedtaksperiode.vedtaksperiodetype) {
        case Vedtaksperiodetype.UTBETALING:
            return vedtaksperiode.utbetalingsperiodeDetaljer;
        case Vedtaksperiodetype.FORTSATT_INNVILGET:
            return vedtaksperiode.utbetalingsperiode.vedtaksperiodetype ===
                Vedtaksperiodetype.UTBETALING
                ? vedtaksperiode.utbetalingsperiode.utbetalingsperiodeDetaljer
                : undefined;
        default:
            return undefined;
    }
};

export interface IUtbetalingsperiodeDetalj {
    person: IGrunnlagPerson;
    ytelseType: YtelseType;
    utbetaltPerMnd: number;
}

export const hentVedtaksperiodeTittel = (
    vedtaksperiodetype: Vedtaksperiodetype,
    utbetalingsperiode?: Utbetalingsperiode
) => {
    if (
        (vedtaksperiodetype === Vedtaksperiodetype.UTBETALING ||
            vedtaksperiodetype === Vedtaksperiodetype.FORTSATT_INNVILGET) &&
        utbetalingsperiode
    ) {
        return ytelsetype[utbetalingsperiode?.ytelseTyper[0]].navn;
    }

    switch (vedtaksperiodetype) {
        case Vedtaksperiodetype.OPPHØR:
            return 'Opphør';
        case Vedtaksperiodetype.AVSLAG:
            return 'Avslag';
        default:
            return '';
    }
};
