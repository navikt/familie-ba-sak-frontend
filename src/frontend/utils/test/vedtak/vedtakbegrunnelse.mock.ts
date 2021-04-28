import {
    IRestVedtakBegrunnelse,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
} from '../../../typer/vedtak';

interface IMockRestVedtakBegrunnelse {
    begrunnelse?: VedtakBegrunnelse;
    begrunnelseType?: VedtakBegrunnelseType;
    fom?: string;
    tom?: string;
}

export const mockVedtakbegrunnelse = ({
    begrunnelse = VedtakBegrunnelse.INNVILGET_BOR_HOS_SØKER,
    begrunnelseType = VedtakBegrunnelseType.INNVILGELSE,
    fom = '2020-01-01',
    tom = '2020-02-28',
}: IMockRestVedtakBegrunnelse = {}): IRestVedtakBegrunnelse => {
    return {
        id: 1,
        begrunnelse,
        begrunnelseType,
        brevBegrunnelse: 'Eksempel brevbegrunnelse',
        fom,
        tom,
    };
};
