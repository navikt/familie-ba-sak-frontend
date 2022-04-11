import {
    type Avhengigheter,
    feil,
    type FeltState,
    ok,
    Valideringsstatus,
} from '@navikt/familie-skjema';

import {
    AnnenForelderAktivitet,
    type IKompetanse,
    type KompetanseResultat,
    type SøkerAktivitet,
} from '../../typer/kompetanse';
import {
    type YearMonth,
    yearMonthTilKalenderMåned,
    type MånedÅr,
    iDag,
    type IYearMonthPeriode,
} from '../../utils/kalender';

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';

const isEmpty = (text?: string | number | boolean | Date | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;
const erFør = (dato1: MånedÅr, dato2: MånedÅr) => {
    if (dato1.måned <= dato2.måned && dato1.år <= dato2.år) {
        return true;
    }

    return dato1.år < dato2.år;
};
const erEtter = (dato1: YearMonth, dato2: YearMonth) =>
    erFør(yearMonthTilKalenderMåned(dato2), yearMonthTilKalenderMåned(dato1));
const valgtÅrMånedErNesteMånedEllerSenere = (valgtDato: MånedÅr, today: MånedÅr) =>
    valgtDato.år > today.år || (valgtDato.år === today.år && valgtDato.måned > today.måned);
const valgtTomErNesteMånedEllerSenere = (valgtDato: YearMonth) =>
    valgtÅrMånedErNesteMånedEllerSenere(yearMonthTilKalenderMåned(valgtDato), iDag());

const erBarnGyldig = (felt: FeltState<string[]>): FeltState<string[]> =>
    felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Minst ett barn må være valgt');
const erSøkersAktivitetGyldig = (
    felt: FeltState<SøkerAktivitet | undefined>
): FeltState<SøkerAktivitet | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt);
const erAnnenForeldersAktivitetGyldig = (
    felt: FeltState<AnnenForelderAktivitet | undefined>
): FeltState<AnnenForelderAktivitet | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt);
const erAnnenForeldersAktivitetslandGyldig = (
    felt: FeltState<string | undefined>,
    avhengigheter?: Avhengigheter
): FeltState<string | undefined> => {
    if (
        avhengigheter?.annenForeldersAktivitet.verdi === AnnenForelderAktivitet.IKKE_AKTUELT ||
        avhengigheter?.annenForeldersAktivitet.verdi === AnnenForelderAktivitet.INAKTIV
    ) {
        return ok(felt);
    }
    return !isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};
const erBarnetsBostedslandGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> => (!isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt));
const erKompetanseResultatGyldig = (
    felt: FeltState<KompetanseResultat | undefined>
): FeltState<KompetanseResultat | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt);

const erKompetansePeriodeGyldig = (
    felt: FeltState<IYearMonthPeriode>,
    avhengigheter?: Avhengigheter
): FeltState<IYearMonthPeriode> => {
    const fom = felt.verdi.fom;
    const tom = felt.verdi.tom;

    if (!fom || isEmpty(fom)) {
        return feil(felt, 'Fra og med måned må være utfylt');
    }
    if (!erEtter(fom, avhengigheter?.initielFom)) {
        return feil(
            felt,
            `Du kan ikke legge inn fra og med måned som er før: ${avhengigheter?.initielFom}`
        );
    }
    if (tom && valgtTomErNesteMånedEllerSenere(tom)) {
        return feil(
            felt,
            'Du kan ikke legge inn til og med måned som er i neste måned eller senere'
        );
    }

    return ok(felt);
};

const validerKompetanse = (nyKompetanse: FeltState<IKompetanse>): FeltState<IKompetanse> => {
    const nyVerdi: IKompetanse = {
        ...nyKompetanse.verdi,
        periode: nyKompetanse.verdi.periode.valider(nyKompetanse.verdi.periode, {
            initielFom: nyKompetanse.verdi.initielFom,
        }),
        barnIdenter: nyKompetanse.verdi.barnIdenter.valider(nyKompetanse.verdi.barnIdenter),
        søkersAktivitet: nyKompetanse.verdi.søkersAktivitet?.valider(
            nyKompetanse.verdi.søkersAktivitet
        ),
        annenForeldersAktivitet: nyKompetanse.verdi.annenForeldersAktivitet?.valider(
            nyKompetanse.verdi.annenForeldersAktivitet
        ),
        annenForeldersAktivitetsland: nyKompetanse.verdi.annenForeldersAktivitetsland?.valider(
            nyKompetanse.verdi.annenForeldersAktivitetsland,
            {
                annenForeldersAktivitet: nyKompetanse.verdi.annenForeldersAktivitet,
            }
        ),
        barnetsBostedsland: nyKompetanse.verdi.barnetsBostedsland?.valider(
            nyKompetanse.verdi.barnetsBostedsland
        ),
        resultat: nyKompetanse.verdi.resultat?.valider(nyKompetanse.verdi.resultat),
    };

    const gyldigkompetanse: boolean =
        nyVerdi.periode.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.barnIdenter.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.søkersAktivitet?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.annenForeldersAktivitet?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.annenForeldersAktivitetsland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.barnetsBostedsland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.resultat?.valideringsstatus === Valideringsstatus.OK;

    return gyldigkompetanse
        ? ok({ ...nyKompetanse, verdi: nyVerdi })
        : feil({ ...nyKompetanse, verdi: nyVerdi }, '');
};

export {
    erKompetansePeriodeGyldig,
    erBarnGyldig,
    erSøkersAktivitetGyldig,
    erAnnenForeldersAktivitetGyldig,
    erAnnenForeldersAktivitetslandGyldig,
    erBarnetsBostedslandGyldig,
    erKompetanseResultatGyldig,
    validerKompetanse,
};
