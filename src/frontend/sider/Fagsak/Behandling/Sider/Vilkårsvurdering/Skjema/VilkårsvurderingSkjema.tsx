import { useFagsak } from '@hooks/useFagsak';
import { FagsakType } from '@typer/fagsak';

import { VilkårsvurderingSkjemaEnsligMindreårig } from './VilkårsvurderingSkjemaEnsligMindreårig';
import { VilkårsvurderingSkjemaInstitusjon } from './VilkårsvurderingSkjemaInstitusjon';
import { VilkårsvurderingSkjemaNormal } from './VilkårsvurderingSkjemaNormal';

interface Props {
    visFeilmeldinger: boolean;
}

export function VilkårsvurderingSkjema({ visFeilmeldinger }: Props) {
    const fagsak = useFagsak();

    const samhandlerOrgnr = fagsak.institusjon?.orgNummer;

    if (fagsak.fagsakType === FagsakType.NORMAL || fagsak.fagsakType === FagsakType.SKJERMET_BARN) {
        return <VilkårsvurderingSkjemaNormal visFeilmeldinger={visFeilmeldinger} />;
    }

    if (fagsak.fagsakType === FagsakType.INSTITUSJON && samhandlerOrgnr) {
        return <VilkårsvurderingSkjemaInstitusjon visFeilmeldinger={visFeilmeldinger} />;
    }

    if (fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return <VilkårsvurderingSkjemaEnsligMindreårig visFeilmeldinger={visFeilmeldinger} />;
    }

    return null;
}
