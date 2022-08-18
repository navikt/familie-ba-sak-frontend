import { parseIso8601String, parseIso8601StringMånedÅr } from './io';
import type { DagMånedÅr, FamilieIsoDate, MånedÅr, YearMonth } from './typer';
import { antallDagerIMåned } from './typer';

export const TIDENES_MORGEN: DagMånedÅr = {
    dag: 1,
    måned: 1,
    år: 1000,
};
export const TIDENES_ENDE: DagMånedÅr = {
    dag: 1,
    måned: 1,
    år: 3000,
};

export const kalenderDato = (dato: FamilieIsoDate): DagMånedÅr => parseIso8601String(dato);

export const yearMonthTilKalenderMåned = (yearMonth: YearMonth): MånedÅr =>
    parseIso8601StringMånedÅr(yearMonth);

export const kalenderDatoMedFallback = (
    dato: FamilieIsoDate | undefined,
    fallbackDato: DagMånedÅr
): DagMånedÅr => (dato ? parseIso8601String(dato) : fallbackDato);

export const kalenderDatoFraDate = (date: Date): DagMånedÅr => ({
    dag: date.getDate(),
    måned: date.getMonth(),
    år: date.getFullYear(),
});

export const kalenderDatoTilDate = (
    dagMånedÅr: DagMånedÅr,
    timer?: number,
    minutter?: number
): Date =>
    new Date(
        dagMånedÅr.år,
        dagMånedÅr.måned,
        dagMånedÅr.dag,
        timer ? timer : 0,
        minutter ? minutter : 0
    );

export const iDag = (): DagMånedÅr => kalenderDatoFraDate(new Date());

export const førsteDagIInneværendeMåned = () => {
    const inneværende = iDag();
    return {
        ...inneværende,
        dag: 1,
    };
};

export const sisteDagIInneværendeMåned = () => {
    const inneværende = iDag();
    return {
        ...inneværende,
        dag: antallDagerIMåned({ måned: inneværende.måned, år: inneværende.år }),
    };
};

export const sammenlignDatoer = (dato1: string, dato2: Date): number => {
    const dato1SomKalenderdato = kalenderDatoTilDate(kalenderDato(dato1));
    if (dato1SomKalenderdato < dato2) {
        return -1;
    } else if (dato1SomKalenderdato > dato2) {
        return 1;
    } else {
        return 0;
    }
};
