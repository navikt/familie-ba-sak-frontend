import { feil, ok } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import { SettPåVentÅrsak } from '../../../../../typer/behandling';
import type { FamilieIsoDate } from '../../../../../utils/kalender';
import { erEtter, erIsoStringGyldig, iDag, kalenderDato } from '../../../../../utils/kalender';

export const validerSettPåVentFrist = (
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

export const hentAlleÅrsaker = () =>
    Object.keys(SettPåVentÅrsak).filter(key => isNaN(Number(key))) as SettPåVentÅrsak[];
