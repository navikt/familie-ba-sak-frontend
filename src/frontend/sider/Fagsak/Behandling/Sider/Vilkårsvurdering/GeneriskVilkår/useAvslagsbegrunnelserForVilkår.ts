import { useFagsak } from '@hooks/useFagsak';
import { erFagsakAvTypeInstitusjon } from '@typer/fagsak';
import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '@typer/vedtak';
import { VedtakBegrunnelseType } from '@typer/vedtak';
import type { AlleBegrunnelser, VilkårType } from '@typer/vilkår';
import { Regelverk } from '@typer/vilkår';

export function useAvslagsbegrunnelserForVilkår(
    vilkårType: VilkårType,
    regelverk: Regelverk | null,
    alleBegrunnelser: AlleBegrunnelser | undefined
): IRestVedtakBegrunnelseTilknyttetVilkår[] {
    const fagsak = useFagsak();

    if (alleBegrunnelser === undefined) {
        return [];
    }

    let begrunnelsestypeGyldigForBehandling: VedtakBegrunnelseType;

    if (regelverk === Regelverk.EØS_FORORDNINGEN) {
        begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.EØS_AVSLAG;
    } else if (erFagsakAvTypeInstitusjon(fagsak)) {
        begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.INSTITUSJON_AVSLAG;
    } else {
        begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.AVSLAG;
    }

    return (alleBegrunnelser[begrunnelsestypeGyldigForBehandling] ?? []).filter(
        begrunnelse => begrunnelse.vilkår === vilkårType
    );
}
