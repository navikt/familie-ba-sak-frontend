import { VedtakBegrunnelseType } from '../../../../../typer/vedtak';
import {
    IRestPersonResultat,
    IRestVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../../typer/vilkår';
import {
    DagMånedÅr,
    erISammeMåned,
    erSamme,
    IPeriode,
    kalenderDatoMedFallback,
    KalenderEnhet,
    sisteDagIMåned,
    TIDENES_ENDE,
    TIDENES_MORGEN,
    trekkFra,
} from '../../../../../utils/kalender';

export const hentUtgjørendeVilkårImpl = (
    begrunnelseType: VedtakBegrunnelseType,
    personResultater: IRestPersonResultat[],
    periode: IPeriode
): VilkårType[] => {
    return personResultater
        .flatMap(personResultat => personResultat.vilkårResultater)
        .filter((vilkårResultat: IRestVilkårResultat) => {
            const vilkårPeriodeFom: DagMånedÅr = kalenderDatoMedFallback(
                vilkårResultat.periodeFom,
                TIDENES_MORGEN
            );
            const vilkårPeriodeTom: DagMånedÅr = kalenderDatoMedFallback(
                vilkårResultat.periodeTom,
                TIDENES_ENDE
            );
            const vedtakPeriodeFom: DagMånedÅr = kalenderDatoMedFallback(
                periode.fom,
                TIDENES_MORGEN
            );
            const oppfyltTomMånedEtter =
                vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ||
                erSamme(vilkårPeriodeTom, sisteDagIMåned(vilkårPeriodeTom))
                    ? 1
                    : 0;

            if (begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                return (
                    erISammeMåned(
                        vilkårPeriodeFom,
                        trekkFra(vedtakPeriodeFom, 1, KalenderEnhet.MÅNED)
                    ) && vilkårResultat.resultat === Resultat.OPPFYLT
                );
            } else if (
                begrunnelseType === VedtakBegrunnelseType.REDUKSJON ||
                begrunnelseType === VedtakBegrunnelseType.OPPHØR
            ) {
                return (
                    erISammeMåned(
                        vilkårPeriodeTom,
                        trekkFra(vedtakPeriodeFom, oppfyltTomMånedEtter, KalenderEnhet.MÅNED)
                    ) && vilkårResultat.resultat === Resultat.OPPFYLT
                );
            } else {
                return true;
            }
        })
        .map((vilkårResultat: IRestVilkårResultat) => vilkårResultat.vilkårType);
};
