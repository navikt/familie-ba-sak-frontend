import { FamilieIsoDate } from '../utils/kalender';
import { IBehandling } from './behandling';
import { ytelsetype, YtelseType } from './beregning';
import { IGrunnlagPerson } from './person';

export enum Vedtaksperiodetype {
    UTBETALING = 'UTBETALING',
    OPPHØR = 'OPPHØR',
    AVSLAG = 'AVSLAG',
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
        case Vedtaksperiodetype.OPPHØR:
            return 'Opphør';
        case Vedtaksperiodetype.AVSLAG:
            return 'Avslag';
        default:
            return '';
    }
};
