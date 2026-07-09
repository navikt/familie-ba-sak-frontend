import { useFagsak } from '@hooks/useFagsak';
import { erFagsakAvTypeInstitusjon } from '@typer/fagsak';
import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '@typer/vedtak';
import { VedtakBegrunnelseType } from '@typer/vedtak';
import type { AlleBegrunnelser, VilkårType } from '@typer/vilkår';
import { Regelverk } from '@typer/vilkår';

const useAvslagBegrunnelseMultiselect = (
    vilkårType: VilkårType,
    regelverk: Regelverk | null,
    alleBegrunnelser: AlleBegrunnelser | undefined
) => {
    const fagsak = useFagsak();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);

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
    };
};

export default useAvslagBegrunnelseMultiselect;
