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
export declare enum IEndretUtbetalingAndelÅrsak {
    DELT_BOSTED = "DELT_BOSTED",
    ENDRE_MOTTAKER = "ENDRE_MOTTAKER",
    ALLEREDE_UTBETALT = "ALLEREDE_UTBETALT",
    ETTERBETALING_3ÅR = "ETTERBETALING_3\u00C5R",
    ETTERBETALING_3MND = "ETTERBETALING_3MND"
}
export declare const årsakTekst: {
    [key in IEndretUtbetalingAndelÅrsak]: string;
};
export declare const årsaker: IEndretUtbetalingAndelÅrsak[];
