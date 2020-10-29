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

// eslint-disable-next-line
export type Valideringsmetadata = { [key: string]: any };
export type ValiderIFelt<T> = (felt: IFelt<T>, metadata?: Valideringsmetadata) => IFelt<T>;

export const defaultValidator = <T>(felt: IFelt<T>) => ({
    ...felt,
    valideringsstatus: Valideringsstatus.OK,
});

export interface IFelt<T> {
    feilmelding: string;
    valider: ValiderIFelt<T>;
    valideringsstatus: Valideringsstatus;
    verdi: T;
}

export const nyttFelt = <T>(verdi: T, valideringsfunksjon?: ValiderIFelt<T>): IFelt<T> => ({
    feilmelding: '',
    valider: valideringsfunksjon ? valideringsfunksjon : defaultValidator,
    valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    verdi,
});
