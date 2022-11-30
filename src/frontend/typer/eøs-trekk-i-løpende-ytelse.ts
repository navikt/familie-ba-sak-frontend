import type { IPeriode, IYearMonthPeriode } from '../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    periode: IPeriode;
    feilutbetaltBeløp: number;
}
export interface IRestTrekkILøpendeUtbetalingIdentifikator {
    id: number;
    behandlingId: number;
}

export interface IRestTrekkILøpendeUtbetaling {
    identifikator: IRestTrekkILøpendeUtbetalingIdentifikator;
    periode: IYearMonthPeriode;
    feilutbetaltBeløp: number;
}
