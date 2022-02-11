import { Avhengigheter, feil, FeltState, ok, Valideringsstatus } from '@navikt/familie-skjema';

import { AnnenForelderAktivitet, IKompetanse, SøkerAktivitet } from '../../typer/kompetanse';
import { YearMonth, yearMonthTilKalenderMåned, MånedÅr } from '../../utils/kalender';

const erFør = (dato1: MånedÅr, dato2: MånedÅr) => {
    if (dato1.måned <= dato2.måned && dato1.år <= dato2.år) {
        return true;
    }

    return dato1.år < dato2.år;
};

const erEtter = (dato1: YearMonth, dato2: YearMonth) => {
    return erFør(yearMonthTilKalenderMåned(dato2), yearMonthTilKalenderMåned(dato1));
};

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';
const erFomGyldig = (
    felt: FeltState<YearMonth>,
    avhengigheter?: Avhengigheter
): FeltState<YearMonth> => {
    if (!felt.verdi) return feil(felt, ikkeUtfyltFelt);
    return erEtter(felt.verdi, avhengigheter?.initielFom)
        ? ok(felt)
        : feil(felt, `Fom. kan ikke være før: ${avhengigheter?.initielFom}`);
};
const erTomGyldig = (felt: FeltState<YearMonth | undefined>): FeltState<YearMonth | undefined> => {
    return ok(felt);
};
const erBarnGyldig = (felt: FeltState<string[]>): FeltState<string[]> => {
    return felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Må velge minst ett barn');
};
const erSøkersAktivitetGyldig = (
    felt: FeltState<SøkerAktivitet | undefined>
): FeltState<SøkerAktivitet | undefined> => {
    return felt.verdi ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};
const erAnnenForeldersAktivitetGyldig = (
    felt: FeltState<AnnenForelderAktivitet | undefined>
): FeltState<AnnenForelderAktivitet | undefined> => {
    return felt.verdi ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};
const erBarnetsBostedslandGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> => {
    return felt.verdi ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};
const erPrimærlandGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> => {
    return felt.verdi ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};
const erSekundærlandGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> => {
    return felt.verdi ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};

const validerKompetanse = (nyKompetanse: FeltState<IKompetanse>): FeltState<IKompetanse> => {
    const nyVerdi: IKompetanse = {
        ...nyKompetanse.verdi,
        fom: nyKompetanse.verdi.fom.valider(nyKompetanse.verdi.fom, {
            initielFom: nyKompetanse.verdi.initielFom,
        }),
        tom: nyKompetanse.verdi.tom.valider(nyKompetanse.verdi.tom),
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

    const gyldigkompetanse: boolean =
        nyVerdi.fom.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.tom.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.barn.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.søkersAktivitet?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.annenForeldersAktivitet?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.barnetsBostedsland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.primærland?.valideringsstatus === Valideringsstatus.OK &&
        nyVerdi.sekundærland?.valideringsstatus === Valideringsstatus.OK;

    return gyldigkompetanse
        ? ok({ ...nyKompetanse, verdi: nyVerdi })
        : feil({ ...nyKompetanse, verdi: nyVerdi }, '');
};

export {
    erFomGyldig,
    erTomGyldig,
    erBarnGyldig,
    erSøkersAktivitetGyldig,
    erAnnenForeldersAktivitetGyldig,
    erBarnetsBostedslandGyldig,
    erPrimærlandGyldig,
    erSekundærlandGyldig,
    validerKompetanse,
};
