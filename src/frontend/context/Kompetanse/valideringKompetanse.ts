import {
    type Avhengigheter,
    feil,
    type FeltState,
    ok,
    Valideringsstatus,
} from '@navikt/familie-skjema';

import {
    AnnenForelderAktivitet,
    type KompetanseResultat,
    type SøkersAktivitet,
} from '../../typer/eøsPerioder';
import { isEmpty } from '../../utils/eøsValidators';

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';

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
        avhengigheter?.annenForeldersAktivitet.valideringsstatus ===
            Valideringsstatus.IKKE_VALIDERT ||
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

export {
    erSøkersAktivitetGyldig,
    erAnnenForeldersAktivitetGyldig,
    erAnnenForeldersAktivitetslandGyldig,
    erBarnetsBostedslandGyldig,
    erKompetanseResultatGyldig,
};
