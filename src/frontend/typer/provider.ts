import { IFelt, ValiderIFelt, Valideringsstatus } from './felt';

export const lagInitiellFelt = <T>(verdi: T, valideringsfunksjon: ValiderIFelt<T>): IFelt<T> => {
    return {
        feilmelding: 'Feltet er påkrevd, men mangler input',
        valideringsFunksjon: valideringsfunksjon,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi,
    };
};
