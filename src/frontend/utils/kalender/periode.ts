import familieDayjs, { familieDayjsDiff, TIDENES_ENDE_DAYJS } from '../familieDayjs';

import {
    FamilieIsoDate,
    IPeriode,
    erEtter,
    erFør,
    erSamme,
    kalenderDato,
    kalenderDatoFraDate,
    tilVisning,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from '.';

export const nyPeriode = (fom?: FamilieIsoDate, tom?: FamilieIsoDate): IPeriode => {
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

export const periodeDiff = (første: IPeriode, annen: IPeriode) => {
    if (!første.fom && !første.tom) {
        return 1;
    }
    return familieDayjsDiff(
        første.fom ? familieDayjs(første.fom) : TIDENES_ENDE_DAYJS,
        annen.fom ? familieDayjs(annen.fom) : TIDENES_ENDE_DAYJS,
        'day'
    );
};

export const lagPeriodeId = (periode: IPeriode) => {
    return periodeToString(periode);
};
