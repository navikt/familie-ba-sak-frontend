import type { IsoDatoString, IsoMånedString } from '../utils/dato';

export interface IRestEndretUtbetalingAndel {
    id?: number;
    personIdenter: string[];
    prosent?: number | null;
    fom?: IsoMånedString;
    tom?: IsoMånedString;
    begrunnelse?: string;
    søknadstidspunkt?: IsoDatoString;
    avtaletidspunktDeltBosted?: IsoDatoString;
    årsak?: IEndretUtbetalingAndelÅrsak;
    erTilknyttetAndeler?: boolean;
}

export enum IEndretUtbetalingAndelÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
    ENDRE_MOTTAKER = 'ENDRE_MOTTAKER',
    ALLEREDE_UTBETALT = 'ALLEREDE_UTBETALT',
    ETTERBETALING_3ÅR = 'ETTERBETALING_3ÅR',
    ETTERBETALING_3MND = 'ETTERBETALING_3MND',
}

export const årsakTekst: { [key in IEndretUtbetalingAndelÅrsak]: string } = {
    DELT_BOSTED: 'Delt bosted',
    ENDRE_MOTTAKER: 'Endre mottaker, begge foreldre rett - opphør',
    ALLEREDE_UTBETALT: 'Allerede utbetalt - innvilgelse',
    ETTERBETALING_3ÅR: 'Etterbetaling 3 år',
    ETTERBETALING_3MND: 'Etterbetaling 3 måneder',
};

export const årsaker: IEndretUtbetalingAndelÅrsak[] = Object.keys(IEndretUtbetalingAndelÅrsak).map(
    k => k as IEndretUtbetalingAndelÅrsak
);
