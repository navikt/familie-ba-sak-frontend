import { useKompetanse } from './Kompetanse/useKompetanse';
import { useUtenlandskPeriodeBeløp } from './UtbetaltAnnetLand/useUtenlandskPeriodeBeløp';
import { useValutakurs } from './Valutakurs/useValutakurs';
import type { IBehandling } from '../../../../../../typer/behandling';

export const useEøs = (åpenBehandling: IBehandling) => {
    const { kompetanser, erKompetanserGyldige, hentKompetanserMedFeil } = useKompetanse({
        åpenBehandling,
    });

    const { utbetaltAnnetLandBeløp, erUtbetaltAnnetLandBeløpGyldige, hentUtbetaltAnnetLandBeløpMedFeil } =
        useUtenlandskPeriodeBeløp({
            åpenBehandling,
        });

    const { valutakurser, erValutakurserGyldige, hentValutakurserMedFeil } = useValutakurs({
        åpenBehandling,
    });

    const erEøsInformasjonGyldig = () => {
        return erKompetanserGyldige() && erUtbetaltAnnetLandBeløpGyldige() && erValutakurserGyldige();
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
