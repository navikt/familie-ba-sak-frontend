import { addYears, endOfMonth, isAfter, isBefore, isSameDay, isValid, parseISO } from 'date-fns';

import type { Avhengigheter, FeltState, ValiderFelt } from '@navikt/familie-skjema';
import { feil, ok, Valideringsstatus } from '@navikt/familie-skjema';
import { idnr } from '@navikt/fnrvalidator';

import type { IIsoDatoPeriode } from './dato';
import { dagensDato, isoStringTilDate } from './dato';
import { bestemFeilmeldingForUtdypendeVilkårsvurdering } from './utdypendeVilkårsvurderinger';
import { Adressebeskyttelsegradering, type IGrunnlagPerson, PersonType } from '../typer/person';
import type { VedtakBegrunnelse } from '../typer/vedtak';
import type { UtdypendeVilkårsvurdering } from '../typer/vilkår';
import { Regelverk, Resultat, ResultatBegrunnelse, VilkårType } from '../typer/vilkår';

const harFyltInnIdent = (felt: FeltState<string>): FeltState<string> => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', '')) ? ok(felt) : feil(felt, 'Identen har ikke 11 tall');
};

const validerIdent = (felt: FeltState<string>): FeltState<string> => {
    return idnr(felt.verdi).status === 'valid' ? ok(felt) : feil(felt, 'Identen er ugyldig');
};

export const identValidator = (identFelt: FeltState<string>): FeltState<string> => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return validerIdent(identFelt);
};

const harFyltInnOrgnr = (felt: FeltState<string>): FeltState<string> => {
    return /^\d{9}$/.test(felt.verdi.replace(' ', '')) ? ok(felt) : feil(felt, 'Orgnummer har ikke 9 tall');
};

export const orgnummerValidator = (orgnummerFelt: FeltState<string>): FeltState<string> => {
    const validated = harFyltInnOrgnr(orgnummerFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return ok(orgnummerFelt);
};

const finnesDatoEtterFødselsdatoPluss18 = (person: IGrunnlagPerson, fom: Date, tom?: Date) => {
    const fødselsdatoPluss18 = addYears(isoStringTilDate(person.fødselsdato), 18);
    return (
        isSameDay(fom, fødselsdatoPluss18) ||
        isAfter(fom, fødselsdatoPluss18) ||
        (tom ? isSameDay(tom, fødselsdatoPluss18) || isAfter(tom, fødselsdatoPluss18) : false)
    );
};

const finnesDatoFørFødselsdato = (person: IGrunnlagPerson, fom: Date, tom?: Date) => {
    const fødselsdato = isoStringTilDate(person.fødselsdato);

    return isBefore(fom, fødselsdato) || (tom ? isBefore(tom, fødselsdato) : false);
};

const erNesteMånedEllerSenere = (dato: Date) => isAfter(dato, endOfMonth(dagensDato));

const erUendelig = (date: Date | undefined): date is undefined => date === undefined;

export const erPeriodeGyldig = (
    felt: FeltState<IIsoDatoPeriode>,
    avhengigheter?: Avhengigheter
): FeltState<IIsoDatoPeriode> => {
    const person: IGrunnlagPerson | undefined = avhengigheter?.person;
    const erEksplisittAvslagPåSøknad: boolean | undefined = avhengigheter?.erEksplisittAvslagPåSøknad;
    const er18ÅrsVilkår: boolean | undefined = avhengigheter?.er18ÅrsVilkår;

    if (felt.verdi.fom) {
        const fom = parseISO(felt.verdi.fom);
        const tom = felt.verdi.tom ? parseISO(felt.verdi.tom) : undefined;

        if (!isValid(fom)) {
            return feil(felt, 'Ugyldig f.o.m.');
        } else if (tom && !isValid(tom)) {
            return feil(felt, 'Ugyldig t.o.m.');
        }

        if (person && person.type === PersonType.BARN) {
            if (finnesDatoFørFødselsdato(person, fom, tom)) {
                return feil(felt, 'Du kan ikke legge til periode før barnets fødselsdato');
            }
            if (er18ÅrsVilkår && finnesDatoEtterFødselsdatoPluss18(person, fom, tom)) {
                return feil(felt, 'Du kan ikke legge til periode på dette vilkåret fra barnet har fylt 18 år');
            }
        }

        const fomDatoErFørTomDato = erUendelig(tom) || isBefore(fom, tom);
        const fomDatoErLikDødsfallDato =
            !!person?.dødsfallDato && isSameDay(fom, isoStringTilDate(person.dødsfallDato));

        if (erNesteMånedEllerSenere(fom)) {
            return feil(felt, 'Du kan ikke legge inn fra og med dato som er i neste måned eller senere');
        }

        if (!erUendelig(tom)) {
            if (!er18ÅrsVilkår && erNesteMånedEllerSenere(tom)) {
                return feil(felt, 'Du kan ikke legge inn til og med dato som er i neste måned eller senere');
            }

            if (person?.dødsfallDato) {
                const dødsfalldato = isoStringTilDate(person.dødsfallDato);

                if (!er18ÅrsVilkår && isAfter(tom, dødsfalldato)) {
                    return feil(felt, 'Du kan ikke sette til og med dato etter dødsfalldato');
                }
            }
        }

        return fomDatoErFørTomDato || fomDatoErLikDødsfallDato
            ? ok(felt)
            : feil(felt, 'F.o.m må settes tidligere enn t.o.m');
    } else {
        if (erEksplisittAvslagPåSøknad) {
            return !felt.verdi.tom
                ? ok(felt)
                : feil(felt, 'F.o.m. må settes eller t.o.m. må fjernes før du kan gå videre');
        } else {
            return feil(felt, 'F.o.m. må settes før du kan gå videre');
        }
    }
};

export const erResultatGyldig = (felt: FeltState<Resultat>, avhengigheter?: Avhengigheter): FeltState<Resultat> => {
    return (avhengigheter?.vurderesEtter !== Regelverk.EØS_FORORDNINGEN &&
        avhengigheter?.resultatBegrunnelse === ResultatBegrunnelse.IKKE_AKTUELT) ||
        felt.verdi === Resultat.IKKE_VURDERT
        ? feil(felt, 'Resultat er ikke satt')
        : ok(felt);
};

export const erAvslagBegrunnelserGyldig = (
    felt: FeltState<VedtakBegrunnelse[]>,
    avhengigheter?: Avhengigheter
): FeltState<VedtakBegrunnelse[]> => {
    const erEksplisittAvslagPåSøknad: boolean | undefined = avhengigheter?.erEksplisittAvslagPåSøknad;
    return erEksplisittAvslagPåSøknad && !felt.verdi.length
        ? feil(felt, 'Du må velge minst en begrunnelse ved avslag')
        : ok(felt);
};

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';

export const lagInitiellFelt = <Value>(value: Value, valideringsfunksjon: ValiderFelt<Value>): FeltState<Value> => {
    return {
        feilmelding: ikkeUtfyltFelt,
        valider: valideringsfunksjon,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: value,
    };
};

export const ikkeValider = <Value>(felt: FeltState<Value>): FeltState<Value> => {
    return ok(felt);
};

export const erBegrunnelseGyldig = (felt: FeltState<string>, avhengigheter?: Avhengigheter): FeltState<string> => {
    if (avhengigheter?.vilkårType === VilkårType.UTVIDET_BARNETRYGD) {
        return felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Du må fylle inn en begrunnelse');
    }

    switch (avhengigheter?.regelverk) {
        case Regelverk.NASJONALE_REGLER: {
            if (felt.verdi.length > 0 || avhengigheter?.utdypendeVilkårsvurderinger.length === 0) {
                return ok(felt);
            }
            return feil(
                felt,
                'Du har gjort ett eller flere valg under "Utdypende vilkårsvurdering" og må derfor fylle inn en begrunnelse'
            );
        }
        case Regelverk.EØS_FORORDNINGEN: {
            if (
                avhengigheter?.regelverk === Regelverk.EØS_FORORDNINGEN &&
                avhengigheter?.personType === PersonType.SØKER &&
                avhengigheter?.vilkårType === VilkårType.BOSATT_I_RIKET
            ) {
                return felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Du må fylle inn en begrunnelse');
            }
            return ok(felt);
        }
        default: {
            return ok(felt);
        }
    }
};

export const erUtdypendeVilkårsvurderingerGyldig = (
    felt: FeltState<UtdypendeVilkårsvurdering[]>,
    avhengigheter?: Avhengigheter
): FeltState<UtdypendeVilkårsvurdering[]> => {
    if (!avhengigheter) {
        return feil(felt, 'Utdypende vilkårsvurdering er ugyldig');
    }
    const feilmelding = bestemFeilmeldingForUtdypendeVilkårsvurdering(felt.verdi, {
        resultat: avhengigheter.resultat,
        personType: avhengigheter.personType,
        vilkårType: avhengigheter.vilkårType,
        vurderesEtter: avhengigheter.vurderesEtter,
    });
    return feilmelding ? feil(felt, feilmelding) : ok(felt);
};

export const erPositivtHeltall = (string: string) => {
    const tall = Number(string);

    return Number.isInteger(tall) && tall > 0;
};

export const erLik0 = (string: string) => {
    const tall = Number(string);

    return Number.isInteger(tall) && tall === 0;
};

export const erAdresseBeskyttet = (adresseBeskyttelsesGradering: Adressebeskyttelsegradering | undefined) => {
    return (
        adresseBeskyttelsesGradering !== undefined &&
        adresseBeskyttelsesGradering !== null &&
        adresseBeskyttelsesGradering !== Adressebeskyttelsegradering.UGRADERT
    );
};
