import { useEffect, useState } from 'react';

import type { IBehandling } from '../../typer/behandling';
import type { IRestValutakurs } from '../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../typer/eøsPerioder';
import { sorterEøsPerioder } from '../Eøs/EøsContext';

interface IProps {
    åpenBehandling: IBehandling;
}

const useValutakurs = ({ åpenBehandling }: IProps) => {
    const [valutakurser, settValutakurser] = useState<IRestValutakurs[]>([]);

    useEffect(() => {
        if (åpenBehandling) {
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
