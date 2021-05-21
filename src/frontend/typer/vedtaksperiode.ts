import { FamilieIsoDate } from '../utils/kalender';
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

export const hentUtbetaltPerMåned = (vedtaksperiode: Vedtaksperiode): number | undefined => {
    switch (vedtaksperiode.vedtaksperiodetype) {
        case Vedtaksperiodetype.UTBETALING:
            return vedtaksperiode.utbetaltPerMnd;
        case Vedtaksperiodetype.FORTSATT_INNVILGET:
            return vedtaksperiode.utbetalingsperiode.vedtaksperiodetype ===
                Vedtaksperiodetype.UTBETALING
                ? vedtaksperiode.utbetalingsperiode.utbetaltPerMnd
                : undefined;
        default:
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

export const hentUtbetalingsperioder = (behandling: IBehandling | undefined) =>
    behandling?.vedtaksperioder.filter(
        periode => periode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING
    ) ?? [];

export const hentVedtaksperiodeTittel = (vedtaksperiode: Vedtaksperiode) => {
    switch (vedtaksperiode.vedtaksperiodetype) {
        case Vedtaksperiodetype.UTBETALING:
            return ytelsetype[vedtaksperiode.ytelseTyper[0]].navn;
        case Vedtaksperiodetype.FORTSATT_INNVILGET:
            if (
                vedtaksperiode.utbetalingsperiode.vedtaksperiodetype ===
                Vedtaksperiodetype.UTBETALING
            ) {
                return ytelsetype[vedtaksperiode.utbetalingsperiode.ytelseTyper[0]].navn;
            } else {
                return '';
            }
        case Vedtaksperiodetype.OPPHØR:
            return 'Opphør';
        case Vedtaksperiodetype.AVSLAG:
            return 'Avslag';
        default:
            return '';
    }
};
