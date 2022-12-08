import type { IYearMonthPeriode } from '../../../../../../utils/kalender';

export interface IRestTrekkILøpendeUtbetalingIdentifikator {
    id: number;
    behandlingId: number;
}

export interface IRestTrekkILøpendeUtbetaling {
    identifikator: IRestTrekkILøpendeUtbetalingIdentifikator;
    periode: IYearMonthPeriode;
    feilutbetaltBeløp: number;
}
