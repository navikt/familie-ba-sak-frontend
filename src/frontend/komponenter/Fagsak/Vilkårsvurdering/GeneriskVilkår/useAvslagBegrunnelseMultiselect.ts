import { RessursStatus } from '@navikt/familie-typer';

import {
    type IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelseType,
} from '../../../../typer/vedtak';
import { Regelverk, type VilkårType } from '../../../../typer/vilkår';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

const useAvslagBegrunnelseMultiselect = (vilkårType: VilkårType, regelverk: Regelverk | null) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    if (vedtaksbegrunnelseTekster.status !== RessursStatus.SUKSESS) {
        return { avslagBegrunnelseTeksterForGjeldendeVilkår: [] };
    }

    const begrunnelsestyperForRegelverk: VedtakBegrunnelseType[] =
        regelverk === Regelverk.EØS_FORORDNINGEN
            ? [VedtakBegrunnelseType.EØS_AVSLAG]
            : [VedtakBegrunnelseType.AVSLAG, VedtakBegrunnelseType.INSTITUSJON_AVSLAG];

    const avslagBegrunnelseTeksterForGjeldendeVilkår = begrunnelsestyperForRegelverk.flatMap(type =>
        vedtaksbegrunnelseTekster.data[type].filter(
            (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                begrunnelse.vilkår === vilkårType
        )
    );

    return {
        avslagBegrunnelseTeksterForGjeldendeVilkår,
    };
};

export default useAvslagBegrunnelseMultiselect;
