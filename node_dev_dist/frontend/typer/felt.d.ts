export declare enum Valideringsstatus {
    FEIL = "FEIL",
    ADVARSEL = "ADVARSEL",
    OK = "OK",
    IKKE_VALIDERT = "IKKE_VALIDERT"
}
export declare const ok: <T>(felt: IFelt<T>) => IFelt<T>;
export declare const feil: <T>(felt: IFelt<T>, feilmelding: string) => IFelt<T>;
export declare type ValiderIFelt<T> = (felt: IFelt<T>) => IFelt<T>;
export interface IFelt<T> {
    feilmelding: string;
    valideringsstatus: Valideringsstatus;
    valideringsFunksjon: ValiderIFelt<T>;
    verdi: T;
}
export declare const nyttFelt: <T>(verdi: T, valideringsFunksjon: ValiderIFelt<T>) => IFelt<T>;
