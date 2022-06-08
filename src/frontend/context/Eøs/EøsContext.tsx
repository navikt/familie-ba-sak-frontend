import constate from 'constate';

import { Status } from '../../ikoner/StatusIkon';
import type { IBehandling } from '../../typer/behandling';
import type { EøsPeriodeStatus } from '../../typer/eøsPerioder';
import { useKompetanse } from '../Kompetanse/KompetanseContext';
import { useUtenlandskPeriodeBeløp } from '../UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpContext';

export const mapEøsPeriodeStatusTilStatus: Record<EøsPeriodeStatus, Status> = {
    IKKE_UTFYLT: Status.ADVARSEL,
    UFULLSTENDIG: Status.FEIL,
    OK: Status.OK,
};

interface IProps {
    åpenBehandling: IBehandling;
}

const [EøsProvider, useEøs] = constate(({ åpenBehandling }: IProps) => {
    const {
        kompetanser,
        kompetanseSubmit,
        settKompetanseSubmit,
        putKompetanse,
        deleteKompetanse,
        erKompetanserGyldige,
        hentKompetanserMedFeil,
    } = useKompetanse({ åpenBehandling });

    const {
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
    } = useUtenlandskPeriodeBeløp({
        åpenBehandling,
    });

    const erEøsInformasjonGyldig = () => {
        return erKompetanserGyldige() && erUtbetaltAnnetLandBeløpGyldige();
    };

    return {
        erEøsInformasjonGyldig,
        kompetanser,
        kompetanseSubmit,
        settKompetanseSubmit,
        putKompetanse,
        deleteKompetanse,
        hentKompetanserMedFeil,
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
    };
});

export { EøsProvider, useEøs };
