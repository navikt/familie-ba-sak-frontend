import { parseIso8601StringMånedÅr } from './io';
import type { DagMånedÅr, MånedÅr, YearMonth } from './typer';

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
