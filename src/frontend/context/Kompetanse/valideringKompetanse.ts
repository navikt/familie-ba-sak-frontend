import {
    type Avhengigheter,
    feil,
    type FeltState,
    ok,
    Valideringsstatus,
} from '@navikt/familie-skjema';

import {
    type AnnenForelderAktivitet,
    type IKompetanse,
    LandkodeNorge,
    type SøkerAktivitet,
} from '../../typer/kompetanse';
import {
    type YearMonth,
    yearMonthTilKalenderMåned,
    type MånedÅr,
    iDag,
    type IYearMonthPeriode,
} from '../../utils/kalender';

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

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';
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
const erBarnetsBostedslandGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> => (!isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt));
const erPrimærlandGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt);
const erSekundærlandGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
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
    let nyVerdi: IKompetanse = {
        ...nyKompetanse.verdi,
        periode: nyKompetanse.verdi.periode.valider(nyKompetanse.verdi.periode, {
            initielFom: nyKompetanse.verdi.initielFom,
        }),
        barn: nyKompetanse.verdi.barn.valider(nyKompetanse.verdi.barn),
        søkersAktivitet: nyKompetanse.verdi.søkersAktivitet?.valider(
            nyKompetanse.verdi.søkersAktivitet
        ),
        annenForeldersAktivitet: nyKompetanse.verdi.annenForeldersAktivitet?.valider(
            nyKompetanse.verdi.annenForeldersAktivitet
        ),
        barnetsBostedsland: nyKompetanse.verdi.barnetsBostedsland?.valider(
            nyKompetanse.verdi.barnetsBostedsland
        ),
        primærland: nyKompetanse.verdi.primærland?.valider(nyKompetanse.verdi.primærland),
        sekundærland: nyKompetanse.verdi.sekundærland?.valider(nyKompetanse.verdi.sekundærland),
    };

    let gyldigkompetanse: boolean =
        nyVerdi.periode.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.barn.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.søkersAktivitet?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.annenForeldersAktivitet?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.barnetsBostedsland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.primærland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.sekundærland?.valideringsstatus === Valideringsstatus.OK;

    if (
        nyVerdi.primærland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.primærland.verdi !== LandkodeNorge &&
        nyVerdi.sekundærland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.sekundærland.verdi !== LandkodeNorge
    ) {
        nyVerdi = {
            ...nyVerdi,
            primærland: {
                ...nyVerdi.primærland,
                valideringsstatus: Valideringsstatus.FEIL,
                verdi: nyVerdi.primærland.verdi,
                feilmelding: 'Norge må være valgt som primærland eller sekundærland',
            },
            sekundærland: {
                ...nyVerdi.sekundærland,
                valideringsstatus: Valideringsstatus.FEIL,
                verdi: nyVerdi.sekundærland.verdi,
                feilmelding: 'Norge må være valgt som primærland eller sekundærland',
            },
        };
        gyldigkompetanse = false;
    }

    return gyldigkompetanse
        ? ok({ ...nyKompetanse, verdi: nyVerdi })
        : feil({ ...nyKompetanse, verdi: nyVerdi }, '');
};

export {
    erKompetansePeriodeGyldig,
    erBarnGyldig,
    erSøkersAktivitetGyldig,
    erAnnenForeldersAktivitetGyldig,
    erBarnetsBostedslandGyldig,
    erPrimærlandGyldig,
    erSekundærlandGyldig,
    validerKompetanse,
};
