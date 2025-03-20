import { RessursStatus } from '@navikt/familie-typer';

import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../../../typer/vedtak';
import { VedtakBegrunnelseType } from '../../../../../../typer/vedtak';
import type { VilkårType } from '../../../../../../typer/vilkår';
import { Regelverk } from '../../../../../../typer/vilkår';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

const useAvslagBegrunnelseMultiselect = (
    vilkårType: VilkårType,
    regelverk: Regelverk | null,
    gjelderInstitusjon: boolean
) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    if (vedtaksbegrunnelseTekster.status !== RessursStatus.SUKSESS) {
        return { avslagBegrunnelseTeksterForGjeldendeVilkår: [] };
    }

    let begrunnelsestypeGyldigForBehandling;

    if (regelverk === Regelverk.EØS_FORORDNINGEN) {
        begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.EØS_AVSLAG;
    } else if (gjelderInstitusjon) {
        begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.INSTITUSJON_AVSLAG;
    } else {
        begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.AVSLAG;
    }

    const avslagBegrunnelseTeksterForGjeldendeVilkår = vedtaksbegrunnelseTekster.data[
        begrunnelsestypeGyldigForBehandling
    ].filter(
        (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => begrunnelse.vilkår === vilkårType
    );

    return {
        avslagBegrunnelseTeksterForGjeldendeVilkår,
    };
};

export default useAvslagBegrunnelseMultiselect;
