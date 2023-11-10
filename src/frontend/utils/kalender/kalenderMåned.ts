import type { DagMånedÅr, YearMonth, FamilieIsoDate, MånedÅr } from '.';
import { antallDagerIMåned, parseIso8601MånedString } from '.';

export const kalenderMåned = (dato: FamilieIsoDate): MånedÅr => {
    const dagMånedÅr = parseIso8601MånedString(dato);
    return {
        måned: dagMånedÅr.måned,
        år: dagMånedÅr.år,
    };
};

export const sisteDagIMåned = (dagMånedÅr: DagMånedÅr): DagMånedÅr => ({
    ...dagMånedÅr,
    dag: antallDagerIMåned({ år: dagMånedÅr.år, måned: dagMånedÅr.måned }),
});

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth): DagMånedÅr => {
    const månedÅr = kalenderMåned(yearMonth);

    return {
        ...månedÅr,
        dag: 1,
    };
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth): DagMånedÅr => {
    const månedÅr = kalenderMåned(yearMonth);

    return {
        ...månedÅr,
        dag: antallDagerIMåned(månedÅr),
    };
};
