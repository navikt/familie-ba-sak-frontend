import { ytelsetype, YtelseType } from './beregning';
export var Vedtaksperiodetype;
(function (Vedtaksperiodetype) {
    Vedtaksperiodetype["UTBETALING"] = "UTBETALING";
    Vedtaksperiodetype["UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING"] = "UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING";
    Vedtaksperiodetype["OPPH\u00D8R"] = "OPPH\u00D8R";
    Vedtaksperiodetype["AVSLAG"] = "AVSLAG";
    Vedtaksperiodetype["FORTSATT_INNVILGET"] = "FORTSATT_INNVILGET";
    Vedtaksperiodetype["ENDRET_UTBETALING"] = "ENDRET_UTBETALING";
})(Vedtaksperiodetype || (Vedtaksperiodetype = {}));
export const hentVedtaksperiodeTittel = (vedtaksperiodeMedBegrunnelser) => {
    var _a;
    const { type, utbetalingsperiodeDetaljer } = vedtaksperiodeMedBegrunnelser;
    const ytelseTyperUtenEndring = (_a = utbetalingsperiodeDetaljer.map(utbetalingsperiodeDetalj => utbetalingsperiodeDetalj.ytelseType)) !== null && _a !== void 0 ? _a : [];
    if ((type === Vedtaksperiodetype.UTBETALING ||
        type === Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING ||
        type === Vedtaksperiodetype.FORTSATT_INNVILGET) &&
        utbetalingsperiodeDetaljer.length > 0) {
        if (ytelseTyperUtenEndring.includes(YtelseType.UTVIDET_BARNETRYGD) &&
            ytelseTyperUtenEndring.includes(YtelseType.SMÅBARNSTILLEGG)) {
            return `${ytelsetype[YtelseType.UTVIDET_BARNETRYGD].navn} og ${ytelsetype[YtelseType.SMÅBARNSTILLEGG].navn.toLowerCase()}`;
        }
        else if (ytelseTyperUtenEndring.includes(YtelseType.UTVIDET_BARNETRYGD)) {
            return ytelsetype[YtelseType.UTVIDET_BARNETRYGD].navn;
        }
        else {
            return ytelsetype[YtelseType.ORDINÆR_BARNETRYGD].navn;
        }
    }
    switch (type) {
        case Vedtaksperiodetype.ENDRET_UTBETALING:
            return 'Endret utbetalingsperiode';
        case Vedtaksperiodetype.OPPHØR:
            return 'Ingen utbetaling';
        case Vedtaksperiodetype.AVSLAG:
            return 'Ingen utbetaling';
        default:
            return '';
    }
};
