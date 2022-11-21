import { RessursStatus } from '@navikt/familie-typer';

import {
    type IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelseType,
} from '../../../../typer/vedtak';
import type { VilkårType } from '../../../../typer/vilkår';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

const useAvslagBegrunnelseMultiselect = (vilkårType: VilkårType) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const avslagBegrunnelseTeksterForGjeldendeVilkår =
        vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS
            ? [VedtakBegrunnelseType.AVSLAG, VedtakBegrunnelseType.INSTITUSJON_AVSLAG].flatMap(
                  type =>
                      vedtaksbegrunnelseTekster.data[type].filter(
                          (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                              begrunnelse.vilkår === vilkårType
                      )
              )
            : [];

    return {
        avslagBegrunnelseTeksterForGjeldendeVilkår,
    };
};

export default useAvslagBegrunnelseMultiselect;
