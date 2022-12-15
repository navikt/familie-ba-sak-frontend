import { parseIso8601MånedString, parseIso8601String, parseIso8601StringMånedÅr } from './io';
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

export const førsteDagIInneværendeMåned = (): DagMånedÅr => {
    const inneværende = iDag();
    return {
        ...inneværende,
        dag: 1,
    };
};

export const sisteDagIInneværendeMåned = (): DagMånedÅr => {
    const inneværende = iDag();
    return {
        ...inneværende,
        dag: antallDagerIMåned({ måned: inneværende.måned, år: inneværende.år }),
    };
};

export const FamilieIsoTilFørsteDagIMåneden = (dato: FamilieIsoDate): FamilieIsoDate => {
    return dato.substring(0, 8) + '01';
};

export const FamilieIsoTilSisteDagIMåneden = (dato: FamilieIsoDate): FamilieIsoDate => {
    const datoDagMånedÅr = parseIso8601MånedString(dato);

    return (
        dato.substring(0, 8) +
        antallDagerIMåned({ måned: datoDagMånedÅr.måned, år: datoDagMånedÅr.år })
    );
};
