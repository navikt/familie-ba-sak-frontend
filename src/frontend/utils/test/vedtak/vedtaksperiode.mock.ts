import { VedtakBegrunnelse, VedtakBegrunnelseType } from '../../../typer/vedtak';
import {
    IRestVedtaksbegrunnelse,
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../typer/vedtaksperiode';
import { FamilieIsoDate } from '../../kalender';

interface IMockVedtaksperiode {
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
    begrunnelser?: IRestVedtaksbegrunnelse[];
}

const mockBegrunnelse = (begrunnelseSpesifikasjon: VedtakBegrunnelse): IRestVedtaksbegrunnelse => {
    return {
        vedtakBegrunnelseSpesifikasjon: begrunnelseSpesifikasjon,
        vedtakBegrunnelseType: VedtakBegrunnelseType.INNVILGELSE,
        personIdenter: ['12345678910'],
    };
};

export const mockUtbetalingsperiode = ({
    fom = '2020-01-01',
    tom = '2020-02-28',
    begrunnelser = [mockBegrunnelse(VedtakBegrunnelse.INNVILGET_BOR_HOS_SØKER)],
}: IMockVedtaksperiode = {}): IVedtaksperiodeMedBegrunnelser => {
    return {
        id: 0,
        fom,
        tom,
        type: Vedtaksperiodetype.UTBETALING,
        begrunnelser,
        fritekster: [],
        gyldigeBegrunnelser: [],
        utbetalingsperiodeDetaljer: [],
    };
};

export const mockOpphørsperiode = ({
    fom = '2020-03-01',
    tom = '',
    begrunnelser = [mockBegrunnelse(VedtakBegrunnelse.OPPHØR_IKKE_MOTTATT_OPPLYSNINGER)],
}: IMockVedtaksperiode = {}): IVedtaksperiodeMedBegrunnelser => {
    return {
        id: 0,
        fom,
        tom,
        type: Vedtaksperiodetype.OPPHØR,
        begrunnelser,
        fritekster: [],
        gyldigeBegrunnelser: [],
        utbetalingsperiodeDetaljer: [],
    };
};

export const mockAvslagsperiode = ({
    fom = '2019-06-01',
    tom = '2019-06-30',
    begrunnelser = [mockBegrunnelse(VedtakBegrunnelse.AVSLAG_MEDLEM_I_FOLKETRYGDEN)],
}: IMockVedtaksperiode = {}): IVedtaksperiodeMedBegrunnelser => {
    return {
        id: 0,
        fom,
        tom,
        type: Vedtaksperiodetype.AVSLAG,
        begrunnelser,
        fritekster: [],
        gyldigeBegrunnelser: [],
        utbetalingsperiodeDetaljer: [],
    };
};
