import {
    feil,
    Avhengigheter,
    FeltState,
    ok,
    ValiderFelt,
    Valideringsstatus,
} from '@navikt/familie-skjema';

import { IPersonMedAndelerTilkjentYtelse } from '../typer/beregning';
import { IPeriode, TIDENES_ENDE, TIDENES_MORGEN } from '../typer/periode';
import { IGrunnlagPerson, PersonType } from '../typer/person';
import { Resultat } from '../typer/vilkår';
import familieDayjs from './familieDayjs';
import { datoformat, isoStringToDayjs } from './formatter';

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
    felt: FeltState<IPersonMedAndelerTilkjentYtelse>
): FeltState<IPersonMedAndelerTilkjentYtelse> => {
    return /^\d{2}\.\d{2}$/.test(felt.verdi.stønadFom) &&
        familieDayjs(felt.verdi.stønadFom, datoformat.MÅNED).isValid()
        ? ok(felt)
        : feil(felt, 'Ugyldig dato');
};

const barnsVilkårErMellom0og18År = (fom: string, person: IGrunnlagPerson, tom?: string) => {
    const fødselsdato = familieDayjs(person.fødselsdato);
    const fødselsdatoPluss18 = familieDayjs(person.fødselsdato).add(18, 'year');
    const fomDato = familieDayjs(fom);
    const tomDato = tom ? familieDayjs(tom) : undefined;
    return (
        fomDato.isSameOrAfter(fødselsdato) &&
        (tomDato ? tomDato.isSameOrBefore(fødselsdatoPluss18) : true)
    );
};

export const erPeriodeGyldig = (
    felt: FeltState<IPeriode>,
    avhengigheter?: Avhengigheter
): FeltState<IPeriode> => {
    const fom = felt.verdi.fom;
    const tom = felt.verdi.tom;

    const person: IGrunnlagPerson | undefined = avhengigheter?.person;
    const erEksplisittAvslagPåSøknad: boolean | undefined =
        avhengigheter?.erEksplisittAvslagPåSøknad;

    if (fom) {
        const fomDatoErGyldig = familieDayjs(fom).isValid();

        const fomDatoErFremITid = familieDayjs(fom).isAfter(familieDayjs());

        const fomDatoErFørTomDato = isoStringToDayjs(fom, TIDENES_MORGEN).isBefore(
            isoStringToDayjs(tom, TIDENES_ENDE)
        );
        const periodeErInnenfor18år =
            person && person.type === PersonType.BARN
                ? barnsVilkårErMellom0og18År(fom, person, tom)
                : true;

        if (fomDatoErFremITid) {
            return feil(felt, 'Du kan ikke legge inn en dato frem i tid');
        }

        return fomDatoErGyldig && fomDatoErFørTomDato && periodeErInnenfor18år
            ? ok(felt)
            : feil(felt, 'Ugyldig periode');
    } else {
        if (erEksplisittAvslagPåSøknad) {
            return !tom
                ? ok(felt)
                : feil(felt, 'F.o.m. må settes eller t.o.m. må fjernes før du kan gå videre');
        } else {
            return feil(felt, 'F.o.m. må settes før du kan gå videre');
        }
    }
};

export const erResultatGyldig = (felt: FeltState<Resultat>): FeltState<Resultat> => {
    return felt.verdi !== Resultat.IKKE_VURDERT ? ok(felt) : feil(felt, 'Resultat er ikke satt');
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

export const validerFormatISODag = (dato: string | undefined) => {
    return familieDayjs(dato, datoformat.ISO_DAG).isValid();
};
