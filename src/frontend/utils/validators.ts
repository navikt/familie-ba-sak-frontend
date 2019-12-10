import * as moment from 'moment';
import { IFødselsnummerFelt } from '../komponenter/Fagsak/Opprett/OpprettBehandlingProvider';
import { IBarnBeregning } from '../typer/behandle';
import { feil, IFelt, ok, Valideringsstatus } from '../typer/felt';

const harFyltInnFødselsnummer = (felt: IFødselsnummerFelt): IFødselsnummerFelt => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'Fødselsnummeret har ikke 11 tall');
};

const fødselsnummerPassererMod10ogMod11Sjekk = (felt: IFødselsnummerFelt): IFødselsnummerFelt => {
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
        : feil(felt, 'Fødselsnummeret er ugyldig');
};

export const fødselsnummerValidator = (
    fødselsnummerFelt: IFødselsnummerFelt
): IFødselsnummerFelt => {
    const validated = harFyltInnFødselsnummer(fødselsnummerFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return fødselsnummerPassererMod10ogMod11Sjekk(fødselsnummerFelt);
};

export const erGyldigDato = (felt: IFelt<IBarnBeregning>): IFelt<IBarnBeregning> => {
    return /^\d{2}\.\d{2}\.\d{2}$/.test(felt.verdi.startDato) &&
        moment(felt.verdi.startDato, 'DD.MM.YY').isValid()
        ? ok(felt)
        : feil(felt, 'Ugyldig dato');
};
