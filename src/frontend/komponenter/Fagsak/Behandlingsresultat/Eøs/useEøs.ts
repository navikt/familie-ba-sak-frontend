import { useKompetanse } from '../../../../context/Kompetanse/KompetanseContext';
import { useUtenlandskPeriodeBeløp } from '../../../../context/UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpContext';
import { useValutakurs } from '../../../../context/Valutakurs/ValutakursContext';
import type { IBehandling } from '../../../../typer/behandling';

export const useEøs = (åpenBehandling: IBehandling) => {
    const { kompetanser, erKompetanserGyldige, hentKompetanserMedFeil } = useKompetanse({
        åpenBehandling,
    });

    const {
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
    } = useUtenlandskPeriodeBeløp({
        åpenBehandling,
    });

    const { valutakurser, erValutakurserGyldige, hentValutakurserMedFeil } = useValutakurs({
        åpenBehandling,
    });

    const erEøsInformasjonGyldig = () => {
        return (
            erKompetanserGyldige() && erUtbetaltAnnetLandBeløpGyldige() && erValutakurserGyldige()
        );
    };

    return {
        erEøsInformasjonGyldig,
        kompetanser,
        hentKompetanserMedFeil,
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
        valutakurser,
        erValutakurserGyldige,
        hentValutakurserMedFeil,
    };
};
