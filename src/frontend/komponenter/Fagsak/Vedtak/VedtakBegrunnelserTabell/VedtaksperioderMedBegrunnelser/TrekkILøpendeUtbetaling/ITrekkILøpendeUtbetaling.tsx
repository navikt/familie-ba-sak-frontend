import type { IYearMonthPeriode } from '../../../../../../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    periode: IYearMonthPeriode;
    feilutbetaltBeløp: number;
}
