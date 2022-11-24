import type { IYearMonthPeriode } from '../../../../../../utils/kalender';

export interface IRestTrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    periode: IYearMonthPeriode;
    feilutbetaltBeløp: number;
}
