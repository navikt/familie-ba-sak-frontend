import moment from 'moment';
import { IPersonBeregning } from '../typer/beregning';
import {
    feil,
    IFelt,
    ok,
    ValiderIFelt,
    Valideringsmetadata,
    Valideringsstatus,
} from '../familie-skjema/felt';
import { IPeriode, stringToMoment, TIDENES_ENDE, TIDENES_MORGEN } from '../typer/periode';
import { IGrunnlagPerson, PersonType } from '../typer/person';
import { Resultat } from '../typer/vilkår';
import { datoformat } from './formatter';

export type IIdentFelt = IFelt<string>;

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const harFyltInnIdent = (felt: IIdentFelt): IIdentFelt => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'Identen har ikke 11 tall');
};

const validerIdent = (felt: IIdentFelt): IIdentFelt => {
    return validator.idnr(felt.verdi).status === 'valid'
        ? ok(felt)
        : feil(felt, 'Identen er ugyldig');
};

export const identValidator = (identFelt: IIdentFelt): IIdentFelt => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return validerIdent(identFelt);
};

export const erGyldigMånedDato = (felt: IFelt<IPersonBeregning>): IFelt<IPersonBeregning> => {
    return /^\d{2}\.\d{2}$/.test(felt.verdi.stønadFom) &&
        moment(felt.verdi.stønadFom, datoformat.MÅNED).isValid()
        ? ok(felt)
        : feil(felt, 'Ugyldig dato');
};

const barnsVilkårErMellom0og18År = (fom: string, person: IGrunnlagPerson, tom?: string) => {
    const fødselsdato = moment(person.fødselsdato);
    const fødselsdatoPluss18 = moment(person.fødselsdato).add(18, 'years');
    const fomDato = moment(fom);
    const tomDato = tom ? moment(tom) : undefined;
    return (
        fomDato.isSameOrAfter(fødselsdato) &&
        (tomDato ? tomDato.isSameOrBefore(fødselsdatoPluss18) : true)
    );
};

export const erPeriodeGyldig = (
    felt: IFelt<IPeriode>,
    valideringsmetadata?: Valideringsmetadata
): IFelt<IPeriode> => {
    const fom = felt.verdi.fom;
    const tom = felt.verdi.tom;

    const person: IGrunnlagPerson | undefined = valideringsmetadata?.person;

    if (fom) {
        const fomDatoErGyldig = moment(fom).isValid();

        const fomDatoErFremITid = moment(fom).isAfter(moment());

        const fomDatoErFørTomDato = stringToMoment(fom, TIDENES_MORGEN).isBefore(
            stringToMoment(tom, TIDENES_ENDE)
        );
        const periodeErInnenfqor18år =
            person && person.type === PersonType.BARN
                ? barnsVilkårErMellom0og18År(fom, person, tom)
                : true;

        if (fomDatoErFremITid) {
            return feil(felt, 'Du kan ikke legge inn en dato frem i tid');
        }

        return fomDatoErGyldig && fomDatoErFørTomDato && periodeErInnenfqor18år
            ? ok(felt)
            : feil(felt, 'Ugyldig periode');
    } else {
        return feil(felt, 'Mangler fra og med dato');
    }
};

export const erResultatGyldig = (felt: IFelt<Resultat>): IFelt<Resultat> => {
    return felt.verdi !== Resultat.KANSKJE ? ok(felt) : feil(felt, 'Resultat er ikke satt');
};

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';
export const erUtfylt = (felt: IFelt<string>): IFelt<string> => {
    if (felt.verdi === '') {
        return feil(felt, ikkeUtfyltFelt);
    }
    return ok(felt);
};

export const lagInitiellFelt = <T>(verdi: T, valideringsfunksjon: ValiderIFelt<T>): IFelt<T> => {
    return {
        feilmelding: ikkeUtfyltFelt,
        valider: valideringsfunksjon,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi,
    };
};

export const validerFelt = <T>(
    nyVerdi: T,
    felt: IFelt<T>,
    valideringsmetadata?: Valideringsmetadata
): IFelt<T> => {
    return felt.valider(
        {
            ...felt,
            verdi: nyVerdi,
        },
        valideringsmetadata
    );
};

export const ikkeValider = <T>(felt: IFelt<T>): IFelt<T> => {
    return ok(felt);
};
