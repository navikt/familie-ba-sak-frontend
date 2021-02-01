import { RessursStatus } from '@navikt/familie-typer';

import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import { IPeriode, TIDENES_ENDE, TIDENES_MORGEN } from '../../../../typer/periode';
import { VedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../typer/vedtak';
import {
    IRestPersonResultat,
    IRestVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../typer/vilkår';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { isoStringToDayjs } from '../../../../utils/formatter';

const useUtbetalingBegrunnelse = (personResultater: IRestPersonResultat[], periode: IPeriode) => {
    const { vilkårBegrunnelser, leggTilUtbetalingBegrunnelse } = useUtbetalingBegrunnelser();

    const onChangeBegrunnelse = (vedtakBegrunnelse: VedtakBegrunnelse) => {
        leggTilUtbetalingBegrunnelse({
            fom: periode.fom ?? '',
            tom: periode.tom,
            vedtakBegrunnelse,
        });
    };

    const hentUtgjørendeVilkår = (begrunnelseType: VedtakBegrunnelseType): VilkårType[] => {
        return personResultater
            .flatMap(personResultat => personResultat.vilkårResultater)
            .filter((vilkårResultat: IRestVilkårResultat) => {
                if (begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                    return (
                        familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeFom, TIDENES_MORGEN),
                            familieDayjs(periode.fom).subtract(1, 'month'),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else if (begrunnelseType === VedtakBegrunnelseType.REDUKSJON) {
                    const oppfyltTomMånedEtter =
                        vilkårResultat.vilkårType !== VilkårType.UNDER_18_ÅR ? 1 : 0;

                    return (
                        familieDayjsDiff(
                            isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE),
                            familieDayjs(periode.fom).subtract(oppfyltTomMånedEtter, 'month'),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else {
                    return true;
                }
            })
            .map((vilkårResultat: IRestVilkårResultat) => vilkårResultat.vilkårType);
    };

    const begrunnelser =
        vilkårBegrunnelser?.status === RessursStatus.SUKSESS && vilkårBegrunnelser.data;

    return {
        begrunnelser,
        hentUtgjørendeVilkår,
        onChangeBegrunnelse,
    };
};

export default useUtbetalingBegrunnelse;
