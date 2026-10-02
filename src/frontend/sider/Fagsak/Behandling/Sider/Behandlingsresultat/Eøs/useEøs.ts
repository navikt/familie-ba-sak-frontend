import { useKompetanse } from './Kompetanse/useKompetanse';
import { useUtenlandskPeriodeBeløp } from './UtbetaltAnnetLand/useUtenlandskPeriodeBeløp';
import { useValutakurs } from './Valutakurs/useValutakurs';

export function useEøs() {
    const { kompetanser, erKompetanserGyldige, hentKompetanserMedFeil } = useKompetanse();

    const { utbetaltAnnetLandBeløp, erUtbetaltAnnetLandBeløpGyldige, hentUtbetaltAnnetLandBeløpMedFeil } =
        useUtenlandskPeriodeBeløp();

    const { valutakurser, erValutakurserGyldige, hentValutakurserMedFeil } = useValutakurs();

    function erEøsInformasjonGyldig() {
        return erKompetanserGyldige() && erUtbetaltAnnetLandBeløpGyldige() && erValutakurserGyldige();
    }

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
}
