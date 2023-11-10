import { parseIso8601String, parseIso8601StringMånedÅr } from './io';
import type { DagMånedÅr, FamilieIsoDate, MånedÅr, YearMonth } from './typer';

export const kalenderDato = (dato: FamilieIsoDate): DagMånedÅr => parseIso8601String(dato);

export const yearMonthTilKalenderMåned = (yearMonth: YearMonth): MånedÅr =>
    parseIso8601StringMånedÅr(yearMonth);

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
