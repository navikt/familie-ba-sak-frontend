import { useState, useEffect } from 'react';

import type { IBehandling } from '../../typer/behandling';
import type { IRestKompetanse } from '../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../typer/eøsPerioder';
import { sorterEøsPerioder } from '../../utils/eøs';

interface IProps {
    åpenBehandling: IBehandling;
}

const useKompetanse = ({ åpenBehandling }: IProps) => {
    const [kompetanser, settKompetanser] = useState<IRestKompetanse[]>([]);

    useEffect(() => {
        if (åpenBehandling.kompetanser.length > 0) {
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
