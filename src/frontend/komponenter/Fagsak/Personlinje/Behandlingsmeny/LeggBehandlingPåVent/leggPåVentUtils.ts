import { feil, FeltState, ok } from '@navikt/familie-skjema';

import {
    erEtter,
    erIsoStringGyldig,
    FamilieIsoDate,
    iDag,
    kalenderDato,
} from '../../../../../utils/kalender';

export const validerLeggPåVentFrist = (
    felt: FeltState<FamilieIsoDate | undefined>
): FeltState<FamilieIsoDate | undefined> => {
    if (felt.verdi && erIsoStringGyldig(felt.verdi)) {
        return felt.verdi && erEtter(kalenderDato(felt.verdi), iDag())
            ? ok(felt)
            : feil(felt, 'Frist kan ikke settes tilbake i tid.');
    } else {
        return feil(felt, 'Du må sette en frist.');
    }
};
