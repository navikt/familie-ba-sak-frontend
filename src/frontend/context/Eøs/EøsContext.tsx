import constate from 'constate';

import { Status } from '../../ikoner/StatusIkon';
import type { IBehandling } from '../../typer/behandling';
import type { KompetanseStatus } from '../../typer/eøsPerioder';
import { useKompetanse } from '../Kompetanse/KompetanseContext';
import { useUtenlandskPeriodeBeløp } from '../UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpContext';

export const mapKompetanseStatusTilStatus: Record<KompetanseStatus, Status> = {
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
        utenlandskePeriodeBeløper,
        erUtenlandskePeriodeBeløperGyldige,
        hentUtenlandskePeriodeBeløperMedFeil,
    } = useUtenlandskPeriodeBeløp({
        åpenBehandling,
    });

    const erEøsInformasjonGyldig = () => {
        return erKompetanserGyldige() && erUtenlandskePeriodeBeløperGyldige();
    };

    return {
        erEøsInformasjonGyldig,
        kompetanser,
        kompetanseSubmit,
        settKompetanseSubmit,
        putKompetanse,
        deleteKompetanse,
        hentKompetanserMedFeil,
        utenlandskePeriodeBeløper,
        erUtenlandskePeriodeBeløperGyldige,
        hentUtenlandskePeriodeBeløperMedFeil,
    };
});

export { EøsProvider, useEøs };
