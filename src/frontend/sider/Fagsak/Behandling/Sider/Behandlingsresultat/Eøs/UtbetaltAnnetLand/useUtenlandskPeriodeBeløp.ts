import { useBehandling } from '@hooks/useBehandling';
import type { IRestUtenlandskPeriodeBeløp } from '@typer/eøsPerioder';
import { EøsPeriodeStatus } from '@typer/eøsPerioder';
import { sorterEøsPerioder } from '@utils/eøs';

export function useUtenlandskPeriodeBeløp() {
    const behandling = useBehandling();

    const utbetaltAnnetLandBeløp = behandling.utenlandskePeriodebeløp.toSorted((periodeA, periodeB) =>
        sorterEøsPerioder(periodeA, periodeB, behandling.personer)
    );

    function erUtbetaltAnnetLandBeløpGyldige(): boolean {
        return hentUtbetaltAnnetLandBeløpMedFeil().length === 0;
    }

    function hentUtbetaltAnnetLandBeløpMedFeil(): IRestUtenlandskPeriodeBeløp[] {
        return utbetaltAnnetLandBeløp.filter(
            utenlandskPeriodeBeløp => utenlandskPeriodeBeløp.status !== EøsPeriodeStatus.OK
        );
    }

    return {
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
    };
}
