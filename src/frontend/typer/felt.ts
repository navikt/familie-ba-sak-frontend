import { IGrunnlagPerson } from './person';

export enum Valideringsstatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

export const ok = <T>(felt: IFelt<T>): IFelt<T> => {
    return {
        ...felt,
        feilmelding: '',
        valideringsstatus: Valideringsstatus.OK,
    };
};

export const feil = <T>(felt: IFelt<T>, feilmelding: string): IFelt<T> => {
    return {
        ...felt,
        feilmelding,
        valideringsstatus: Valideringsstatus.FEIL,
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

export const nyttFelt = <T>(verdi: T, valideringsfunksjon: ValiderIFelt<T>): IFelt<T> => ({
    feilmelding: '',
    valideringsfunksjon,
    valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    verdi,
});
