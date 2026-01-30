import { useHentAlleBegrunnelser } from '../../../../../../hooks/useHentAlleBegrunnelser';
import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../../../typer/vedtak';
import { VedtakBegrunnelseType } from '../../../../../../typer/vedtak';
import type { VilkårType } from '../../../../../../typer/vilkår';
import { Regelverk } from '../../../../../../typer/vilkår';

const useAvslagBegrunnelseMultiselect = (
    vilkårType: VilkårType,
    regelverk: Regelverk | null,
    gjelderInstitusjon: boolean
) => {
    const { data: alleBegrunnelser, status: alleBegrunnelserStatus } = useHentAlleBegrunnelser();

    const finnAvslagsbegrunnelserForGjeldendeVilkår = () => {
        if (alleBegrunnelser === undefined) {
            return [];
        }

        let begrunnelsestypeGyldigForBehandling;

        if (regelverk === Regelverk.EØS_FORORDNINGEN) {
            begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.EØS_AVSLAG;
        } else if (gjelderInstitusjon) {
            begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.INSTITUSJON_AVSLAG;
        } else {
            begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.AVSLAG;
        }

        const avslagBegrunnelseTeksterForGjeldendeVilkår = alleBegrunnelser[begrunnelsestypeGyldigForBehandling].filter(
            (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => begrunnelse.vilkår === vilkårType
        );

        return avslagBegrunnelseTeksterForGjeldendeVilkår;
    };

    return {
        avslagsbegrunnelserForGjeldendeVilkår: finnAvslagsbegrunnelserForGjeldendeVilkår(),
        begrunnelserStatus: alleBegrunnelserStatus,
    };
};

export default useAvslagBegrunnelseMultiselect;
