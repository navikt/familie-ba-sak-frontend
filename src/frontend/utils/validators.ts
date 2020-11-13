import moment from 'moment';
import { IPersonBeregning } from '../typer/beregning';
import { FeltState, ValiderFelt, FeltContext, Valideringsstatus } from '../familie-skjema/typer';
import { IPeriode, stringToMoment, TIDENES_ENDE, TIDENES_MORGEN } from '../typer/periode';
import { IGrunnlagPerson, PersonType } from '../typer/person';
import { Resultat } from '../typer/vilkår';
import { datoformat } from './formatter';
import { feil, ok } from '../familie-skjema/validators';

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const harFyltInnIdent = (felt: FeltState<string>): FeltState<string> => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'Identen har ikke 11 tall');
};

const validerIdent = (felt: FeltState<string>): FeltState<string> => {
    return validator.idnr(felt.verdi).status === 'valid'
        ? ok(felt)
        : feil(felt, 'Identen er ugyldig');
};

export const identValidator = (identFelt: FeltState<string>): FeltState<string> => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return validerIdent(identFelt);
};

export const erGyldigMånedDato = (
    felt: FeltState<IPersonBeregning>
): FeltState<IPersonBeregning> => {
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
    felt: FeltState<IPeriode>,
    avhengigheter?: FeltContext
): FeltState<IPeriode> => {
    const fom = felt.verdi.fom;
    const tom = felt.verdi.tom;

    const person: IGrunnlagPerson | undefined = avhengigheter?.person;

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

export const erResultatGyldig = (felt: FeltState<Resultat>): FeltState<Resultat> => {
    return felt.verdi !== Resultat.KANSKJE ? ok(felt) : feil(felt, 'Resultat er ikke satt');
};

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';
export const erUtfylt = (felt: FeltState<string>): FeltState<string> => {
    if (felt.verdi === '') {
        return feil(felt, ikkeUtfyltFelt);
    }
    return ok(felt);
};

export const lagInitiellFelt = <Value>(
    value: Value,
    valideringsfunksjon: ValiderFelt<Value>
): FeltState<Value> => {
    return {
        feilmelding: ikkeUtfyltFelt,
        valider: valideringsfunksjon,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: value,
    };
};

export const validerFelt = <Value, Context>(
    nyVerdi: Value,
    felt: FeltState<Value>,
    context?: Context
): FeltState<Value> => {
    return felt.valider(
        {
            ...felt,
            verdi: nyVerdi,
        },
        context ? context : {}
    );
};

export const ikkeValider = <Value>(felt: FeltState<Value>): FeltState<Value> => {
    return ok(felt);
};
