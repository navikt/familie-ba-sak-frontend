import type { FamilieIsoDate, IPeriode, IYearMonthPeriode, YearMonth } from '.';
import {
    erEtter,
    erFør,
    erSamme,
    kalenderDato,
    kalenderDatoFraDate,
    tilVisning,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
    kalenderDiff,
    kalenderDatoTilDate,
    yearMonthTilVisning,
    yearMonthTilKalenderMåned,
} from '.';

export const nyPeriode = (fom?: FamilieIsoDate, tom?: FamilieIsoDate): IPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

export const nyYearMonthPeriode = (fom?: YearMonth, tom?: YearMonth): IYearMonthPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

export const periodeOverlapperMedValgtDato = (
    periodeFom: FamilieIsoDate | undefined,
    periodeTom: FamilieIsoDate | undefined,
    valgtDato: Date
) => {
    const valgtDatoDagMånedÅr = kalenderDatoFraDate(valgtDato);
    const periodeFomDagMånedÅr = kalenderDatoMedFallback(periodeFom, TIDENES_MORGEN);
    const periodeTomDagMånedÅr = kalenderDatoMedFallback(periodeTom, TIDENES_ENDE);

    return (
        (erEtter(valgtDatoDagMånedÅr, periodeFomDagMånedÅr) &&
            erFør(valgtDatoDagMånedÅr, periodeTomDagMånedÅr)) ||
        erSamme(valgtDatoDagMånedÅr, periodeFomDagMånedÅr) ||
        erSamme(valgtDatoDagMånedÅr, periodeTomDagMånedÅr)
    );
};

export const periodeToString = (periode: IPeriode) => {
    return `${tilVisning(periode.fom ? kalenderDato(periode.fom) : undefined)} - ${tilVisning(
        periode.tom ? kalenderDato(periode.tom) : undefined
    )}`;
};

export const periodeDiff = (første: IPeriode, andre: IPeriode) => {
    if (!første.fom && !første.tom) {
        return 1;
    }
    return kalenderDiff(
        kalenderDatoTilDate(kalenderDatoMedFallback(første.fom, TIDENES_ENDE)),
        kalenderDatoTilDate(kalenderDatoMedFallback(andre.fom, TIDENES_ENDE))
    );
};

export const lagPeriodeId = (periode: IPeriode) => {
    return periodeToString(periode);
};

export const yearMonthPeriodeToString = (periode: IYearMonthPeriode) => {
    return `${yearMonthTilVisning(
        periode.fom ? yearMonthTilKalenderMåned(periode.fom) : undefined
    )} - ${yearMonthTilVisning(periode.tom ? yearMonthTilKalenderMåned(periode.tom) : undefined)}`;
};
