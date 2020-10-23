import { IGrunnlagPerson } from './person';

export enum Valideringsstatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

export const ok = <T>(felt: IFelt<T>): IFelt<T> => {
    return {
        feilmelding: '',
        valideringsfunksjon: felt.valideringsfunksjon,
        valideringsstatus: Valideringsstatus.OK,
        verdi: felt.verdi,
    };
};

export const feil = <T>(felt: IFelt<T>, feilmelding: string): IFelt<T> => {
    return {
        feilmelding,
        valideringsfunksjon: felt.valideringsfunksjon,
        valideringsstatus: Valideringsstatus.FEIL,
        verdi: felt.verdi,
    };
};

export type ValiderIFelt<T> = (felt: IFelt<T>, person?: IGrunnlagPerson) => IFelt<T>;

export const defaultValidator = <T>(felt: IFelt<T>) => ({
    ...felt,
    valideringsstatus: Valideringsstatus.OK,
});

export interface IFelt<T> {
    feilmelding: string;
    feltId?: string;
    valideringsfunksjon: ValiderIFelt<T>;
    valideringsstatus: Valideringsstatus;
    verdi: T;
}

export const nyttFelt = <T>(verdi: T, valideringsFunksjon?: ValiderIFelt<T>): IFelt<T> => ({
    feilmelding: '',
    valideringsfunksjon: valideringsFunksjon ? valideringsFunksjon : defaultValidator,
    valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    verdi,
});
