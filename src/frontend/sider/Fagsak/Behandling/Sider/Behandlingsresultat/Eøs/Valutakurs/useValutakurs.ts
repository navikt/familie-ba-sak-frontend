import { useBehandling } from '@hooks/useBehandling';
import type { IRestValutakurs } from '@typer/eøsPerioder';
import { EøsPeriodeStatus } from '@typer/eøsPerioder';
import { sorterEøsPerioder } from '@utils/eøs';

export function useValutakurs() {
    const behandling = useBehandling();

    const valutakurser = behandling.valutakurser.toSorted((periodeA, periodeB) =>
        sorterEøsPerioder(periodeA, periodeB, behandling.personer)
    );

    function erValutakurserGyldige(): boolean {
        return hentValutakurserMedFeil().length === 0;
    }

    function hentValutakurserMedFeil(): IRestValutakurs[] {
        return valutakurser.filter(valutakurs => valutakurs.status !== EøsPeriodeStatus.OK);
    }

    return {
        valutakurser,
        erValutakurserGyldige,
        hentValutakurserMedFeil,
    };
}
