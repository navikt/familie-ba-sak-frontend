import type { DagMånedÅr, YearMonth, FamilieIsoDate, MånedÅr } from '.';
import { antallDagerIMåned, kalenderDatoFraDate, parseIso8601MånedString } from '.';

export const kalenderMåned = (dato: FamilieIsoDate): MånedÅr => {
    const dagMånedÅr = parseIso8601MånedString(dato);
    return {
        måned: dagMånedÅr.måned,
        år: dagMånedÅr.år,
    };
};

export const sisteDatoIMnd = (måned: number, år: number): Date => {
    // Måneden i Date objektet er 0-indeksert
    return new Date(år, måned + 1, 0);
};

export const sisteDagIMåned = (dagMånedÅr: DagMånedÅr) => ({
    ...dagMånedÅr,
    dag: antallDagerIMåned({ år: dagMånedÅr.år, måned: dagMånedÅr.måned }),
});

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth) => {
    const månedÅr = kalenderMåned(yearMonth);

    return {
        ...månedÅr,
        dag: 1,
    };
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth) => {
    const månedÅr = kalenderMåned(yearMonth);

    return {
        ...månedÅr,
        dag: antallDagerIMåned(månedÅr),
    };
};

export const nesteMåned = (): DagMånedÅr => {
    const now = new Date();
    if (now.getMonth() === 11) {
        return kalenderDatoFraDate(new Date(now.getFullYear() + 1, 0, 1));
    } else {
        return kalenderDatoFraDate(new Date(now.getFullYear(), now.getMonth() + 1, 1));
    }
};
