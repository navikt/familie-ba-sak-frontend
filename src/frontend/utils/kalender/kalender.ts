import { parseIso8601StringMånedÅr } from './io';
import type { MånedÅr, YearMonth } from './typer';

export const yearMonthTilKalenderMåned = (yearMonth: YearMonth): MånedÅr =>
    parseIso8601StringMånedÅr(yearMonth);
