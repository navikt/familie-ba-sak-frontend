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
} from '.';

export const nyPeriode = (fom?: FamilieIsoDate, tom?: FamilieIsoDate): IPeriode => {
    return {
        fom: fom !== '' && fom ? fom : undefined,
        tom: tom !== '' && tom ? tom : undefined,
    };
};

export const periodeOverlapperMedValgtDato = (
    periodeFom: FamilieIsoDate,
    periodeTom: FamilieIsoDate,
    valgtDato: Date
) => {
    const valgtDatoToDayjs = kalenderDatoFraDate(valgtDato);
    const periodeFomToDayjs = kalenderDato(periodeFom);
    const periodeTomToDayjs = kalenderDato(periodeTom);

    return (
        (erEtter(valgtDatoToDayjs, periodeFomToDayjs) &&
            erFør(valgtDatoToDayjs, periodeTomToDayjs)) ||
        erSamme(valgtDatoToDayjs, periodeFomToDayjs) ||
        erSamme(valgtDatoToDayjs, periodeTomToDayjs)
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
