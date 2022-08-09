import type { OptionType } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok } from '@navikt/familie-skjema';

import { KorrigertEtterbetalingÅrsak } from '../../../../typer/vedtak';
import { isEmpty, isNumeric } from '../../../../utils/eøsValidators';

const ikkeUtfyltFelt = 'Feltet er påkrevd, men mangler input';

export const erÅrsakForKorrigeringGyldig = (felt: FeltState<OptionType>) => {
    if (felt.verdi) {
        if (isEmpty(felt.verdi.value)) {
            return feil(felt, ikkeUtfyltFelt);
        }
        return Object.keys(KorrigertEtterbetalingÅrsak).some(aarsak => aarsak === felt.verdi.value)
            ? ok(felt)
            : feil(felt, 'Ugyldig årsak');
    }
    return feil(felt, ikkeUtfyltFelt);
};

export const erEtterbetalingsbeløpGyldig = (felt: FeltState<string>) => {
    return !isEmpty(felt.verdi) && isNumeric(felt.verdi) ? ok(felt) : feil(felt, ikkeUtfyltFelt);
};
