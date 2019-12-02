import { feil, IFelt, ok, ValideringsStatus } from '../../../typer/felt';

const harFyltInnFødselsnummer = (felt: IFelt<string>): IFelt<string> => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'Fødselsnummer.UgyldigFormat');
};

const fødselsnummerPassererMod10ogMod11Sjekk = (felt: IFelt<string>): IFelt<string> => {
    const vektSifreMod10 = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
    const vektSifreMod11 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

    let sumMod10 = 0;
    for (let i = 0; i < 10; i++) {
        sumMod10 += Number.parseInt(felt.verdi.charAt(i), 10) * vektSifreMod10[i];
    }

    let sumMod11 = 0;
    for (let i = 0; i < 11; i++) {
        sumMod11 += Number.parseInt(felt.verdi.charAt(i), 10) * vektSifreMod11[i];
    }

    return sumMod10 % 11 === 0 && sumMod11 % 11 === 0
        ? ok(felt)
        : feil(felt, 'Fødselsnummer.ModSjekkFeil');
};

export const fødselsnummerValidator = (fødselsnummerFelt: IFelt<string>): IFelt<string> => {
    const validated = harFyltInnFødselsnummer(fødselsnummerFelt);
    if (validated.valideringsStatus != ValideringsStatus.OK) {
        return validated;
    }

    return fødselsnummerPassererMod10ogMod11Sjekk(fødselsnummerFelt);
};

export const fødselsnummerListeValidator = (
    fødselsnummerListeFelt: IFelt<IFelt<string>[]>
): IFelt<IFelt<string>[]> => {
    if (fødselsnummerListeFelt.verdi.length == 0) {
        return feil(fødselsnummerListeFelt, 'Fødselsnummer.TomListe');
    }

    let firstError = -1;
    const validatedListeFelt = {
        ...fødselsnummerListeFelt,
        verdi: fødselsnummerListeFelt.verdi.map((felt, index) => {
            const validatedFelt = felt.valideringsFunksjon(felt);
            if (firstError < 0) {
                firstError =
                    validatedFelt.valideringsStatus == ValideringsStatus.FEIL ? index : firstError;
            }
            return validatedFelt;
        }),
    };
    return firstError < 0
        ? ok(validatedListeFelt)
        : feil(validatedListeFelt, firstError.toString());
};
