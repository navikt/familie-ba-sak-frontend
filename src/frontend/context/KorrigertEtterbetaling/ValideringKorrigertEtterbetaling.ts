import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok } from '@navikt/familie-skjema';

import { KorrigertEtterbetalingÅrsak } from '../../typer/vedtak';
import { isEmpty, isNumeric } from '../../utils/eøsValidators';

export const erÅrsakForKorrigeringGyldig = (felt: FeltState<string>) => {
    if (isEmpty(felt.verdi)) {
        return feil(felt, 'Velg en årsak');
    }
    return Object.keys(KorrigertEtterbetalingÅrsak).some(aarsak => aarsak === felt.verdi)
        ? ok(felt)
        : feil(felt, 'Ugyldig årsak');
};

export const erEtterbetalingsbeløpGyldig = (felt: FeltState<string>) => {
    return !isEmpty(felt.verdi) && isNumeric(felt.verdi)
        ? ok(felt)
        : feil(felt, 'Skriv inn etterbetalingsbeløp');
};
