import {
    feil,
    Avhengigheter,
    FeltState,
    ok,
    ValiderFelt,
    Valideringsstatus,
} from '@navikt/familie-skjema';

import { IGrunnlagPerson, PersonType } from '../typer/person';
import { VedtakBegrunnelse } from '../typer/vedtak';
import { Resultat } from '../typer/vilkår';
import {
    erEtter,
    erFør,
    erIsoStringGyldig,
    erSamme,
    IPeriode,
    kalenderDato,
    kalenderDatoMedFallback,
    KalenderEnhet,
    leggTil,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from './kalender';

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

const finnesDatoEtterFødselsdatoPluss18 = (person: IGrunnlagPerson, fom: string, tom?: string) => {
    const fødselsdatoPluss18 = leggTil(kalenderDato(person.fødselsdato), 18, KalenderEnhet.ÅR);
    const fomDato = kalenderDato(fom);
    const tomDato = kalenderDatoMedFallback(tom, TIDENES_ENDE);
    return (
        erSamme(fomDato, fødselsdatoPluss18) ||
        erEtter(fomDato, fødselsdatoPluss18) ||
        (tomDato
            ? erSamme(tomDato, fødselsdatoPluss18) || erEtter(tomDato, fødselsdatoPluss18)
            : false)
    );
};

const finnesDatoFørFødselsdato = (person: IGrunnlagPerson, fom: string, tom?: string) => {
    const fødselsdato = kalenderDato(person.fødselsdato);
    const fomDato = kalenderDato(fom);
    const tomDato = tom ? kalenderDato(tom) : undefined;

    return erFør(fomDato, fødselsdato) || (tomDato ? erFør(tomDato, fødselsdato) : false);
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
    const er18ÅrsVilkår: boolean | undefined = avhengigheter?.er18ÅrsVilkår;

    if (fom) {
        if (!erIsoStringGyldig(fom)) {
            return feil(felt, 'Ugyldig f.o.m.');
        } else if (tom && !erIsoStringGyldig(tom)) {
            return feil(felt, 'Ugyldig t.o.m.');
        }

        if (!erEksplisittAvslagPåSøknad) {
            if (person && person.type === PersonType.BARN) {
                if (finnesDatoFørFødselsdato(person, fom, tom)) {
                    return feil(felt, 'Du kan ikke legge til periode før barnets fødselsdato');
                }
                if (er18ÅrsVilkår && finnesDatoEtterFødselsdatoPluss18(person, fom, tom)) {
                    return feil(
                        felt,
                        'Du kan ikke legge til periode på dette vilkåret fra barnet har fylt 18 år'
                    );
                }
            }
        }
        const fomDatoErFørTomDato = erFør(
            kalenderDatoMedFallback(fom, TIDENES_MORGEN),
            kalenderDatoMedFallback(tom, TIDENES_ENDE)
        );

        return fomDatoErFørTomDato ? ok(felt) : feil(felt, 'F.o.m må settes tidligere enn t.o.m');
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

export const erAvslagBegrunnelserGyldig = (
    felt: FeltState<VedtakBegrunnelse[]>,
    avhengigheter?: Avhengigheter
): FeltState<VedtakBegrunnelse[]> => {
    const erEksplisittAvslagPåSøknad: boolean | undefined =
        avhengigheter?.erEksplisittAvslagPåSøknad;
    return erEksplisittAvslagPåSøknad && !felt.verdi.length
        ? feil(felt, 'Du må velge minst en begrunnelse ved avslag')
        : ok(felt);
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

export const erBegrunnelseGyldig = (felt: FeltState<string>, avhengigheter?: Avhengigheter) => {
    if (
        felt.verdi.length > 0 ||
        !(
            avhengigheter?.erMedlemskapVurdert ||
            avhengigheter?.erSkjønnsmessigVurdert ||
            avhengigheter?.erDeltBosted
        )
    ) {
        return ok(felt);
    }

    return feil(
        felt,
        'Du har haket av under "Andre vurderinger" og må derfor fylle inn en begrunnelse'
    );
};
