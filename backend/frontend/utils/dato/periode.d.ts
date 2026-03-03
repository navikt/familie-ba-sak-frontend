import type { IsoDatoString, IsoMånedString } from './dato';
import { Datoformat } from './dato';
export interface IIsoDatoPeriode {
    fom?: IsoDatoString;
    tom?: IsoDatoString;
}
export interface IIsoMånedPeriode {
    fom?: IsoMånedString;
    tom?: IsoMånedString;
}
export declare const nyIsoDatoPeriode: (fom?: IsoDatoString, tom?: IsoDatoString) => IIsoDatoPeriode;
export declare const nyIsoMånedPeriode: (fom?: IsoMånedString, tom?: IsoMånedString) => IIsoMånedPeriode;
export declare const isoDatoPeriodeTilFormatertString: (periode: IIsoDatoPeriode) => string;
interface FormaterIsoMånedPeriodeProps {
    periode: IIsoMånedPeriode;
    tilFormat: Datoformat;
}
export declare const isoMånedPeriodeTilFormatertString: ({ periode, tilFormat }: FormaterIsoMånedPeriodeProps) => string;
export declare const periodeOverlapperMedValgtDato: (periodeFom: IsoDatoString, periodeTom: IsoDatoString | undefined, valgtDato: Date) => boolean;
export {};
