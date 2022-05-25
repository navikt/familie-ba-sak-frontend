import { useState, useEffect } from 'react';

import type { IBehandling } from '../../typer/behandling';
import { EøsPeriodeStatus } from '../../typer/eøsPerioder';
import type { IRestUtenlandskPeriodeBeløp } from '../../typer/eøsPerioder';
import { ToggleNavn } from '../../typer/toggles';
import { useApp } from '../AppContext';

interface IProps {
    åpenBehandling: IBehandling;
}

const useUtenlandskPeriodeBeløp = ({ åpenBehandling }: IProps) => {
    const { toggles } = useApp();
    const [utenlandskePeriodeBeløper, settUtenlandskePeriodeBeløper] = useState<
        IRestUtenlandskPeriodeBeløp[]
    >([]);

    useEffect(() => {
        if (toggles[ToggleNavn.brukEøs] && åpenBehandling.utenlandskePeriodebeløp.length > 0) {
            settUtenlandskePeriodeBeløper(åpenBehandling.utenlandskePeriodebeløp);
        }
    }, [åpenBehandling]);

    const erUtenlandskePeriodeBeløperGyldige = (): boolean => {
        return hentUtenlandskePeriodeBeløperMedFeil().length === 0;
    };

    const hentUtenlandskePeriodeBeløperMedFeil = (): IRestUtenlandskPeriodeBeløp[] => {
        return utenlandskePeriodeBeløper.filter(
            utenlandskPeriodeBeløp => utenlandskPeriodeBeløp.status !== EøsPeriodeStatus.OK
        );
    };

    return {
        utenlandskePeriodeBeløper,
        erUtenlandskePeriodeBeløperGyldige,
        hentUtenlandskePeriodeBeløperMedFeil,
    };
};

export { useUtenlandskPeriodeBeløp };
