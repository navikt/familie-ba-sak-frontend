import { RessursStatus } from '@navikt/familie-typer';

import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../typer/vedtak';
import type { VilkårType } from '../../../../typer/vilkår';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

const useAvslagBegrunnelseMultiselect = (vilkårType: VilkårType) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const avslagBegrunnelseTeksterForGjeldendeVilkår =
        vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS
            ? vedtaksbegrunnelseTekster.data.AVSLAG.filter(
                  (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                      begrunnelse.vilkår === vilkårType
              )
            : [];

    return {
        avslagBegrunnelseTeksterForGjeldendeVilkår,
    };
};

export default useAvslagBegrunnelseMultiselect;
