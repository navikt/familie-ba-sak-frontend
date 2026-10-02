import { useBehandling } from '@hooks/useBehandling';
import { EøsPeriodeStatus, type IRestKompetanse } from '@typer/eøsPerioder';
import { sorterEøsPerioder } from '@utils/eøs';

export function useKompetanse() {
    const behandling = useBehandling();

    const kompetanser = behandling.kompetanser.toSorted((periodeA, periodeB) =>
        sorterEøsPerioder(periodeA, periodeB, behandling.personer)
    );

    function erKompetanserGyldige(): boolean {
        return hentKompetanserMedFeil().length === 0;
    }

    function hentKompetanserMedFeil(): IRestKompetanse[] {
        return kompetanser.filter(kompetanse => kompetanse.status !== EøsPeriodeStatus.OK);
    }

    return {
        kompetanser,
        erKompetanserGyldige,
        hentKompetanserMedFeil,
    };
}
