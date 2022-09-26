import { useState, useEffect } from 'react';

import type { IBehandling } from '../../typer/behandling';
import { EøsPeriodeStatus } from '../../typer/eøsPerioder';
import type { IRestUtenlandskPeriodeBeløp } from '../../typer/eøsPerioder';
import { sorterEøsPerioder } from '../Eøs/EøsContext';

interface IProps {
    åpenBehandling: IBehandling;
}

const useUtenlandskPeriodeBeløp = ({ åpenBehandling }: IProps) => {
    const [utbetaltAnnetLandBeløp, settUtbetaltAnnetLandBeløp] = useState<
        IRestUtenlandskPeriodeBeløp[]
    >([]);

    useEffect(() => {
        if (åpenBehandling) {
            settUtbetaltAnnetLandBeløp(
                åpenBehandling.utenlandskePeriodebeløp.sort((periodeA, periodeB) =>
                    sorterEøsPerioder(periodeA, periodeB, åpenBehandling.personer)
                )
            );
        }
    }, [åpenBehandling]);

    const erUtbetaltAnnetLandBeløpGyldige = (): boolean => {
        return hentUtbetaltAnnetLandBeløpMedFeil().length === 0;
    };

    const hentUtbetaltAnnetLandBeløpMedFeil = (): IRestUtenlandskPeriodeBeløp[] => {
        return utbetaltAnnetLandBeløp.filter(
            utenlandskPeriodeBeløp => utenlandskPeriodeBeløp.status !== EøsPeriodeStatus.OK
        );
    };

    return {
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
    };
};

export { useUtenlandskPeriodeBeløp };
