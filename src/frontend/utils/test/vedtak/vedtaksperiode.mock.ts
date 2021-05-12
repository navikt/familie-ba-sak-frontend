import { YtelseType } from '../../../typer/beregning';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { førsteDagIInneværendeMåned, serializeIso8601String } from '../../kalender';

interface IMockVedtaksperiode {
    periodeFom?: string;
    periodeTom?: string;
}

export const mockUtbetalingsperiode = ({
    periodeFom = '2020-01-01',
    periodeTom = '2020-02-28',
}: IMockVedtaksperiode = {}): Vedtaksperiode => {
    return {
        periodeFom,
        periodeTom,
        vedtaksperiodetype: Vedtaksperiodetype.UTBETALING,
        utbetalingsperiodeDetaljer: [],
        ytelseTyper: [YtelseType.ORDINÆR_BARNETRYGD],
        antallBarn: 1,
        utbetaltPerMnd: 1054,
    };
};

export const mockOpphørsperiode = ({
    periodeFom = '2020-03-01',
    periodeTom = '',
}: IMockVedtaksperiode = {}): Vedtaksperiode => {
    return {
        periodeFom,
        periodeTom,
        vedtaksperiodetype: Vedtaksperiodetype.OPPHØR,
    };
};

export const mockAvslagsperiode = ({
    periodeFom = '2019-06-01',
    periodeTom = '2019-06-30',
}: IMockVedtaksperiode = {}): Vedtaksperiode => {
    return {
        periodeFom,
        periodeTom,
        vedtaksperiodetype: Vedtaksperiodetype.AVSLAG,
    };
};

export const mockFortsattInnvilgetperiode = ({
    periodeFom = serializeIso8601String(førsteDagIInneværendeMåned()),
    periodeTom = '',
}: IMockVedtaksperiode = {}): Vedtaksperiode => {
    return {
        periodeFom,
        periodeTom,
        vedtaksperiodetype: Vedtaksperiodetype.FORTSATT_INNVILGET,
        utbetalingsperiode: mockUtbetalingsperiode(),
    };
};
