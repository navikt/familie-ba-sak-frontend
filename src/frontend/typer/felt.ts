export function ok<T>(felt: IFelt<T>): IFelt<T> {
    return {
        feilmelding: '',
        valideringsStatus: ValideringsStatus.OK,
        valideringsFunksjon: felt.valideringsFunksjon,
        verdi: felt.verdi,
    };
}

export function feil<T>(felt: IFelt<T>, feilmelding: string): IFelt<T> {
    return {
        feilmelding: feilmelding,
        valideringsStatus: ValideringsStatus.FEIL,
        valideringsFunksjon: felt.valideringsFunksjon,
        verdi: felt.verdi,
    };
}

export enum ValideringsStatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

export type ValiderIFelt<T> = (felt: IFelt<T>) => IFelt<T>;

export interface IFelt<T> {
    feilmelding: string;
    valideringsStatus: ValideringsStatus;
    valideringsFunksjon: ValiderIFelt<T>;
    verdi: T;
}
