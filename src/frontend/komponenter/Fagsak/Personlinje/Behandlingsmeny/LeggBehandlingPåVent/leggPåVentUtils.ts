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
            : feil(felt, 'Fristen kan ikke være før dagens dato.');
    } else {
        return feil(felt, 'Du må velge en dato.');
    }
};
