import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok } from '@navikt/familie-skjema';

import { KorrigertEtterbetalingÅrsak } from '../../../../../../typer/vedtak';
import { isEmpty } from '../../../../../../utils/eøsValidators';
import { erLik0, erPositivtHeltall } from '../../../../../../utils/validators';

export const erÅrsakForKorrigeringGyldig = (felt: FeltState<string>) => {
    if (isEmpty(felt.verdi)) {
        return feil(felt, 'Velg en årsak');
    }
    return Object.keys(KorrigertEtterbetalingÅrsak).some(aarsak => aarsak === felt.verdi)
        ? ok(felt)
        : feil(felt, 'Ugyldig årsak');
};

export const erEtterbetalingsbeløpGyldig = (felt: FeltState<string>) => {
    return !isEmpty(felt.verdi) && (erPositivtHeltall(felt.verdi) || erLik0(felt.verdi))
        ? ok(felt)
        : feil(felt, 'Skriv inn etterbetalingsbeløp. Desimaltall støttes ikke.');
};
