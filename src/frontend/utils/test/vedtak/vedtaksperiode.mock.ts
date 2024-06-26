import { VedtakBegrunnelseType } from '../../../typer/vedtak';
import type {
    IRestVedtaksbegrunnelse,
    IVedtaksperiodeMedBegrunnelser,
} from '../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import type { IsoDatoString } from '../../dato';

interface IMockVedtaksperiode {
    fom?: IsoDatoString;
    tom?: IsoDatoString;
    begrunnelser?: IRestVedtaksbegrunnelse[];
}

const mockBegrunnelse = (): IRestVedtaksbegrunnelse => {
    return {
        standardbegrunnelse: 'Test',
        vedtakBegrunnelseType: VedtakBegrunnelseType.INNVILGET,
        støtterFritekst: false,
    };
};

export const mockUtbetalingsperiode = ({
    fom = '2020-01-01',
    tom = '2020-02-28',
    begrunnelser = [mockBegrunnelse()],
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
    begrunnelser = [mockBegrunnelse()],
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
