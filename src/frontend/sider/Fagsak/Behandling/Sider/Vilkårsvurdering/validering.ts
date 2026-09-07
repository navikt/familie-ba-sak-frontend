import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IRestAnnenVurdering, IRestVilkårResultat, UtdypendeVilkårsvurdering } from '@typer/vilkår';
import { Regelverk, Resultat, ResultatBegrunnelse, VilkårType } from '@typer/vilkår';
import type { IIsoDatoPeriode } from '@utils/dato';
import { dagensDato, isoStringTilDate, nyIsoDatoPeriode } from '@utils/dato';
import type { UtdypendeVilkårsvurderingAvhengigheter } from '@utils/utdypendeVilkårsvurderinger';
import { bestemFeilmeldingForUtdypendeVilkårsvurdering } from '@utils/utdypendeVilkårsvurderinger';
import { addYears, endOfMonth, isAfter, isBefore, isSameDay, isValid, parseISO } from 'date-fns';

export type VilkårResultatUi = Resultat | ResultatBegrunnelse;

export function tilVilkårResultatUi(vilkårResultat: IRestVilkårResultat): VilkårResultatUi {
    return vilkårResultat.resultatBegrunnelse ?? vilkårResultat.resultat;
}

export function tilResultat(resultatUi: VilkårResultatUi): Resultat {
    return resultatUi === ResultatBegrunnelse.IKKE_AKTUELT ? Resultat.OPPFYLT : resultatUi;
}

export function tilResultatBegrunnelse(resultatUi: VilkårResultatUi): ResultatBegrunnelse | null {
    return resultatUi === ResultatBegrunnelse.IKKE_AKTUELT ? resultatUi : null;
}

interface PeriodeAvhengigheter {
    person: IGrunnlagPerson;
    erEksplisittAvslagPåSøknad: boolean;
    er18ÅrsVilkår?: boolean;
}

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

export function validerPeriode(
    periode: IIsoDatoPeriode,
    { person, erEksplisittAvslagPåSøknad, er18ÅrsVilkår = false }: PeriodeAvhengigheter
): string | undefined {
    if (!periode.fom) {
        if (erEksplisittAvslagPåSøknad) {
            return periode.tom ? 'F.o.m. må settes eller t.o.m. må fjernes før du kan gå videre' : undefined;
        }
        return 'F.o.m. må settes før du kan gå videre';
    }

    const fom = parseISO(periode.fom);
    const tom = periode.tom ? parseISO(periode.tom) : undefined;

    if (!isValid(fom)) {
        return 'Ugyldig f.o.m.';
    }
    if (tom && !isValid(tom)) {
        return 'Ugyldig t.o.m.';
    }

    if (person.type === PersonType.BARN) {
        if (finnesDatoFørFødselsdato(person, fom, tom)) {
            return 'Du kan ikke legge til periode før barnets fødselsdato';
        }
        if (er18ÅrsVilkår && finnesDatoEtterFødselsdatoPluss18(person, fom, tom)) {
            return 'Du kan ikke legge til periode på dette vilkåret fra barnet har fylt 18 år';
        }
    }

    if (erNesteMånedEllerSenere(fom)) {
        return 'Du kan ikke legge inn fra og med dato som er i neste måned eller senere';
    }

    if (tom) {
        if (!er18ÅrsVilkår && erNesteMånedEllerSenere(tom)) {
            return 'Du kan ikke legge inn til og med dato som er i neste måned eller senere';
        }
        if (person.dødsfallDato && !er18ÅrsVilkår && isAfter(tom, isoStringTilDate(person.dødsfallDato))) {
            return 'Du kan ikke sette til og med dato etter dødsfalldato';
        }
    }

    const fomDatoErFørTomDato = tom === undefined || isBefore(fom, tom);
    const fomDatoErLikDødsfallDato = !!person.dødsfallDato && isSameDay(fom, isoStringTilDate(person.dødsfallDato));

    return fomDatoErFørTomDato || fomDatoErLikDødsfallDato ? undefined : 'F.o.m må settes tidligere enn t.o.m';
}

interface ResultatAvhengigheter {
    vurderesEtter: Regelverk | null;
}

export function validerResultat(
    resultat: VilkårResultatUi,
    { vurderesEtter }: ResultatAvhengigheter
): string | undefined {
    const erIkkeAktueltUtenforEøs =
        resultat === ResultatBegrunnelse.IKKE_AKTUELT && vurderesEtter !== Regelverk.EØS_FORORDNINGEN;
    return erIkkeAktueltUtenforEøs || resultat === Resultat.IKKE_VURDERT ? 'Resultat er ikke satt' : undefined;
}

interface AvslagBegrunnelserAvhengigheter {
    erEksplisittAvslagPåSøknad: boolean;
}

export function validerAvslagBegrunnelser(
    avslagBegrunnelser: VedtakBegrunnelse[],
    { erEksplisittAvslagPåSøknad }: AvslagBegrunnelserAvhengigheter
): string | undefined {
    return erEksplisittAvslagPåSøknad && avslagBegrunnelser.length === 0
        ? 'Du må velge minst en begrunnelse ved avslag'
        : undefined;
}

interface BegrunnelseAvhengigheter {
    vilkårType: VilkårType;
    regelverk: Regelverk | null;
    utdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[];
    personType: PersonType;
}

export function erBegrunnelsePåkrevd({
    vilkårType,
    regelverk,
    utdypendeVilkårsvurderinger,
    personType,
}: BegrunnelseAvhengigheter): boolean {
    return (
        vilkårType === VilkårType.UTVIDET_BARNETRYGD ||
        (regelverk === Regelverk.NASJONALE_REGLER && utdypendeVilkårsvurderinger.length > 0) ||
        (regelverk === Regelverk.EØS_FORORDNINGEN &&
            personType === PersonType.SØKER &&
            vilkårType === VilkårType.BOSATT_I_RIKET)
    );
}

export function validerBegrunnelse(begrunnelse: string, avhengigheter: BegrunnelseAvhengigheter): string | undefined {
    if (begrunnelse.length > 0 || !erBegrunnelsePåkrevd(avhengigheter)) {
        return undefined;
    }
    if (
        avhengigheter.regelverk === Regelverk.NASJONALE_REGLER &&
        avhengigheter.vilkårType !== VilkårType.UTVIDET_BARNETRYGD
    ) {
        return 'Du har gjort ett eller flere valg under "Utdypende vilkårsvurdering" og må derfor fylle inn en begrunnelse';
    }
    return 'Du må fylle inn en begrunnelse';
}

export function validerUtdypendeVilkårsvurderinger(
    utdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[],
    avhengigheter: UtdypendeVilkårsvurderingAvhengigheter
): string | undefined {
    return bestemFeilmeldingForUtdypendeVilkårsvurdering(utdypendeVilkårsvurderinger, avhengigheter);
}

export function erVilkårResultatGyldig(vilkårResultat: IRestVilkårResultat, person: IGrunnlagPerson): boolean {
    const erEksplisittAvslagPåSøknad = vilkårResultat.erEksplisittAvslagPåSøknad ?? false;
    const feilmeldinger = [
        validerPeriode(nyIsoDatoPeriode(vilkårResultat.periodeFom, vilkårResultat.periodeTom), {
            person,
            erEksplisittAvslagPåSøknad,
            er18ÅrsVilkår: vilkårResultat.vilkårType === VilkårType.UNDER_18_ÅR,
        }),
        validerBegrunnelse(vilkårResultat.begrunnelse, {
            vilkårType: vilkårResultat.vilkårType,
            regelverk: vilkårResultat.vurderesEtter,
            utdypendeVilkårsvurderinger: vilkårResultat.utdypendeVilkårsvurderinger,
            personType: person.type,
        }),
        validerResultat(tilVilkårResultatUi(vilkårResultat), { vurderesEtter: vilkårResultat.vurderesEtter }),
        validerAvslagBegrunnelser(vilkårResultat.avslagBegrunnelser, { erEksplisittAvslagPåSøknad }),
        validerUtdypendeVilkårsvurderinger(vilkårResultat.utdypendeVilkårsvurderinger, {
            personType: person.type,
            vilkårType: vilkårResultat.vilkårType,
            resultat: vilkårResultat.resultat,
            vurderesEtter: vilkårResultat.vurderesEtter,
        }),
    ];
    return feilmeldinger.every(feilmelding => feilmelding === undefined);
}

export function validerAnnenVurderingResultat(resultat: Resultat): string | undefined {
    return resultat === Resultat.IKKE_VURDERT ? 'Resultat er ikke satt' : undefined;
}

export function erAnnenVurderingGyldig(annenVurdering: IRestAnnenVurdering): boolean {
    return validerAnnenVurderingResultat(annenVurdering.resultat) === undefined;
}
