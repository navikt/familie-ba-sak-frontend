import type { FamilieIsoDate, IYearMonthPeriode } from '../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
    feilutbetaltBeløp: number;
}
export interface IRestTrekkILøpendeUtbetalingIdentifikator {
    id: number;
    behandlingId: number;
}

export interface IRestTrekkILøpendeUtbetaling {
    identifikator: IRestTrekkILøpendeUtbetalingIdentifikator;
    periode: IYearMonthPeriode;
    feilutbetaltBeløp?: number;
}
