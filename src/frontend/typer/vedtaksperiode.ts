import {
    erEtter,
    erFør,
    erSamme,
    FamilieIsoDate,
    IPeriode,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
    kalenderDatoFraDate,
    kalenderDato,
} from '../utils/kalender';
import { IBehandling } from './behandling';
import { ytelsetype, YtelseType } from './beregning';
import { IGrunnlagPerson } from './person';
import { VedtakBegrunnelse, VedtakBegrunnelseType } from './vedtak';

export interface IVedtaksperiodeMedBegrunnelser {
    id: number;
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
    type: Vedtaksperiodetype;
    begrunnelser: IRestVedtaksbegrunnelse[];
    fritekster: string[];
    gyldigeBegrunnelser: VedtakBegrunnelse[];
}

export interface IRestVedtaksbegrunnelse {
    vedtakBegrunnelseSpesifikasjon: VedtakBegrunnelse;
    vedtakBegrunnelseType: VedtakBegrunnelseType;
    personIdenter: string[];
}

export interface IRestPutVedtaksbegrunnelse {
    vedtakBegrunnelseSpesifikasjon: VedtakBegrunnelse;
}

export interface IRestPutVedtaksperiodeMedFritekster {
    fritekster: string[];
}

export enum Vedtaksperiodetype {
    UTBETALING = 'UTBETALING',
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

export const hentGjeldendeUtbetalingsperiodePåBehandlingOgPeriode = (
    periode: IPeriode,
    behandling: IBehandling
): Utbetalingsperiode | undefined => {
    const sorterteUtbetalingsperioder = sorterUtbetalingsperioder(
        behandling.utbetalingsperioder
    ).filter(periode => periode?.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING);

    return periode.fom
        ? hentUtbetalingsperiodeInnenforPeriode(sorterteUtbetalingsperioder, periode)
        : hentSistGjeldendeEllerNesteUtbetalingsperiode(sorterteUtbetalingsperioder);
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
        if (
            utbetalingsperiode?.ytelseTyper.includes(YtelseType.UTVIDET_BARNETRYGD) &&
            utbetalingsperiode?.ytelseTyper.includes(YtelseType.SMÅBARNSTILLEGG)
        ) {
            return `${ytelsetype[YtelseType.UTVIDET_BARNETRYGD].navn} og ${ytelsetype[
                YtelseType.SMÅBARNSTILLEGG
            ].navn.toLowerCase()}`;
        } else if (utbetalingsperiode?.ytelseTyper.includes(YtelseType.UTVIDET_BARNETRYGD)) {
            return ytelsetype[YtelseType.UTVIDET_BARNETRYGD].navn;
        } else {
            return ytelsetype[YtelseType.ORDINÆR_BARNETRYGD].navn;
        }
    }

    switch (vedtaksperiodetype) {
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

const hentSistGjeldendeEllerNesteUtbetalingsperiode = (
    sorterteUtbetalingsperioder: Utbetalingsperiode[]
): Utbetalingsperiode | undefined => {
    const nå = kalenderDatoFraDate(new Date());

    const sistGjeldendeUtbetalingsperiode = sorterteUtbetalingsperioder
        .filter(
            utbetalingsperiode =>
                erFør(kalenderDato(utbetalingsperiode.periodeFom), nå) ||
                erSamme(kalenderDato(utbetalingsperiode.periodeFom), nå)
        )
        .slice(-1)[0];

    if (sistGjeldendeUtbetalingsperiode === undefined) {
        return sorterteUtbetalingsperioder[0];
    } else {
        return sistGjeldendeUtbetalingsperiode;
    }
};

const hentUtbetalingsperiodeInnenforPeriode = (
    sorterteUtbetalingsperioder: Utbetalingsperiode[],
    periode: IPeriode
): Utbetalingsperiode | undefined => {
    const periodeFom = kalenderDatoMedFallback(periode.fom, TIDENES_MORGEN);
    const periodeTom = kalenderDatoMedFallback(periode.tom, TIDENES_ENDE);

    return sorterteUtbetalingsperioder.find(utbetalingsperiode => {
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
};

const sorterUtbetalingsperioder = (
    utbetalingsperioder: Utbetalingsperiode[]
): Utbetalingsperiode[] =>
    utbetalingsperioder.sort((utbetalingsperiodeA, utbetalingsperiodeB) =>
        erEtter(
            kalenderDato(utbetalingsperiodeA.periodeFom),
            kalenderDato(utbetalingsperiodeB.periodeFom)
        )
            ? 1
            : -1
    );
