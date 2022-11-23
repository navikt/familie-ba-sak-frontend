import type { YearMonth } from '../../../../../../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    fom?: YearMonth;
    tom?: YearMonth;
    feilutbetaltBeløp: number;
}
