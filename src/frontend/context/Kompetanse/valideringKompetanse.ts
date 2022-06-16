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
    type SøkersAktivitet,
} from '../../typer/eøsPerioder';
import { isEmpty } from '../../utils/eøsValidators';

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';

const erBarnGyldig = (felt: FeltState<string[]>): FeltState<string[]> =>
    felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Minst ett barn må være valgt');
const erSøkersAktivitetGyldig = (
    felt: FeltState<SøkersAktivitet | undefined>
): FeltState<SøkersAktivitet | undefined> =>
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
    erBarnGyldig,
    erSøkersAktivitetGyldig,
    erAnnenForeldersAktivitetGyldig,
    erAnnenForeldersAktivitetslandGyldig,
    erBarnetsBostedslandGyldig,
    erKompetanseResultatGyldig,
    validerKompetanse,
};
