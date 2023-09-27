import { RessursStatus } from '@navikt/familie-typer';

import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../typer/vedtak';
import { VedtakBegrunnelseType } from '../../../../typer/vedtak';
import type { VilkårType } from '../../../../typer/vilkår';
import { Regelverk } from '../../../../typer/vilkår';
import { useVedtaksbegrunnelseTekster } from '../../Vedtak/VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';

const useAvslagBegrunnelseMultiselect = (vilkårType: VilkårType, regelverk: Regelverk | null, gjelderInstitusjon: boolean) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    if (vedtaksbegrunnelseTekster.status !== RessursStatus.SUKSESS) {
        return { avslagBegrunnelseTeksterForGjeldendeVilkår: [] };
    }

    const begrunnelsestypeGyldigForBehandling =
        regelverk === Regelverk.EØS_FORORDNINGEN
            ? VedtakBegrunnelseType.EØS_AVSLAG
            : gjelderInstitusjon
            ? VedtakBegrunnelseType.INSTITUSJON_AVSLAG
            : VedtakBegrunnelseType.AVSLAG;

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
