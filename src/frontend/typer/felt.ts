export enum Valideringsstatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

export const ok = <T>(felt: IFelt<T>): IFelt<T> => {
    return {
        feilmelding: '',
        valideringsFunksjon: felt.valideringsFunksjon,
        valideringsstatus: Valideringsstatus.OK,
        verdi: felt.verdi,
    };
};

export const feil = <T>(felt: IFelt<T>, feilmelding: string): IFelt<T> => {
    return {
        feilmelding,
        valideringsFunksjon: felt.valideringsFunksjon,
        valideringsstatus: Valideringsstatus.FEIL,
        verdi: felt.verdi,
    };
};

export type ValiderIFelt<T> = (felt: IFelt<T>) => IFelt<T>;

export interface IFelt<T> {
    feilmelding: string;
    valideringsstatus: Valideringsstatus;
    valideringsFunksjon: ValiderIFelt<T>;
    verdi: T;
}

export const nyttFelt = <T>(verdi: T, valideringsFunksjon: ValiderIFelt<T>): IFelt<T> => ({
    feilmelding: '',
    valideringsFunksjon,
    valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    verdi,
});
