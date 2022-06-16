import { useEffect, useState } from 'react';

import type { IBehandling } from '../../typer/behandling';
import type { IRestValutakurs } from '../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../typer/eøsPerioder';
import { ToggleNavn } from '../../typer/toggles';
import { useApp } from '../AppContext';
import { sorterEøsPerioder } from '../Eøs/EøsContext';

interface IProps {
    åpenBehandling: IBehandling;
}

const useValutakurs = ({ åpenBehandling }: IProps) => {
    const { toggles } = useApp();
    const [valutakurser, settValutakurser] = useState<IRestValutakurs[]>([]);

    useEffect(() => {
        if (toggles[ToggleNavn.brukEøs] && åpenBehandling) {
            settValutakurser(
                åpenBehandling.valutakurser.sort((periodeA, periodeB) =>
                    sorterEøsPerioder(periodeA, periodeB, åpenBehandling.personer)
                )
            );
        }
    }, [åpenBehandling]);

    const erValutakurserGyldige = (): boolean => {
        return hentValutakurserMedFeil().length === 0;
    };

    const hentValutakurserMedFeil = (): IRestValutakurs[] => {
        return valutakurser.filter(valutakurs => valutakurs.status !== EøsPeriodeStatus.OK);
    };

    return {
        valutakurser,
        erValutakurserGyldige,
        hentValutakurserMedFeil,
    };
};

export { useValutakurs };
