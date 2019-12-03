export const ok = <T>(felt: IFelt<T>): IFelt<T> => {
    return {
        feilmelding: '',
        valideringsFunksjon: felt.valideringsFunksjon,
        valideringsStatus: ValideringsStatus.OK,
        verdi: felt.verdi,
    };
};

export const feil = <T>(felt: IFelt<T>, feilmelding: string): IFelt<T> => {
    return {
        feilmelding,
        valideringsFunksjon: felt.valideringsFunksjon,
        valideringsStatus: ValideringsStatus.FEIL,
        verdi: felt.verdi,
    };
};

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
