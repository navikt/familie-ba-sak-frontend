import { IPersonBeregning } from '../typer/beregning';
import { IFelt, ValiderIFelt } from '../typer/felt';
import { IPeriode } from '../typer/periode';
import { Resultat } from '../typer/vilkår';
export declare type IIdentFelt = IFelt<string>;
export declare const identValidator: (identFelt: IIdentFelt) => IIdentFelt;
export declare const erGyldigMånedDato: (felt: IFelt<IPersonBeregning>) => IFelt<IPersonBeregning>;
export declare const erPeriodeGyldig: (felt: IFelt<IPeriode>) => IFelt<IPeriode>;
export declare const erResultatGyldig: (felt: IFelt<Resultat>) => IFelt<Resultat>;
export declare const erGyldigBegrunnelse: (felt: IFelt<string>) => IFelt<string>;
export declare const erUtfylt: (felt: IFelt<string>) => IFelt<string>;
export declare const lagInitiellFelt: <T>(verdi: T, valideringsfunksjon: ValiderIFelt<T>) => IFelt<T>;
export declare const validerFelt: <T>(nyVerdi: T, felt: IFelt<T>) => IFelt<T>;
