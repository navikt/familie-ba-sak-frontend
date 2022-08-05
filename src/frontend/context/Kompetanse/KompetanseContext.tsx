import { useState, useEffect } from 'react';

import type { IBehandling } from '../../typer/behandling';
import { EøsPeriodeStatus, type IRestKompetanse } from '../../typer/eøsPerioder';
import { ToggleNavn } from '../../typer/toggles';
import { useApp } from '../AppContext';
import { sorterEøsPerioder } from '../Eøs/EøsContext';

interface IProps {
    åpenBehandling: IBehandling;
}

const useKompetanse = ({ åpenBehandling }: IProps) => {
    const { toggles } = useApp();
    const [kompetanser, settKompetanser] = useState<IRestKompetanse[]>([]);

    useEffect(() => {
        if (toggles[ToggleNavn.brukEøs] && åpenBehandling.kompetanser.length > 0) {
            settKompetanser(
                åpenBehandling.kompetanser.sort((periodeA, periodeB) =>
                    sorterEøsPerioder(periodeA, periodeB, åpenBehandling.personer)
                )
            );
        }
    }, [åpenBehandling]);

    const erKompetanserGyldige = (): boolean => {
        return hentKompetanserMedFeil().length === 0;
    };

    const hentKompetanserMedFeil = (): IRestKompetanse[] => {
        return kompetanser.filter(kompetanse => kompetanse.status !== EøsPeriodeStatus.OK);
    };

    return {
        kompetanser,
        erKompetanserGyldige,
        hentKompetanserMedFeil,
    };
};

export { useKompetanse };
