import type { IPeriode } from '../../../../../../utils/kalender';

export interface ITrekkILøpendeUtbetaling {
    id: number;
    behandlingId: number;
    periode: IPeriode;
    feilutbetaltBeløp: number;
}
