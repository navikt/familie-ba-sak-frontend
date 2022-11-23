import type { YearMonth } from '../../../../../../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    fom?: YearMonth;
    tom?: YearMonth;
    sum: number;
}
