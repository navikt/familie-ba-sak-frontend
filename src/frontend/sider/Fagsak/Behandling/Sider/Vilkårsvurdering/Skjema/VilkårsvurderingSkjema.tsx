import { useFagsak } from '@hooks/useFagsak';
import { FagsakType } from '@typer/fagsak';

import { VilkårsvurderingSkjemaEnsligMindreårig } from './VilkårsvurderingSkjemaEnsligMindreårig';
import { VilkårsvurderingSkjemaInstitusjon } from './VilkårsvurderingSkjemaInstitusjon';
import { VilkårsvurderingSkjemaNormal } from './VilkårsvurderingSkjemaNormal';

export function VilkårsvurderingSkjema() {
    const fagsak = useFagsak();

    const samhandlerOrgnr = fagsak.institusjon?.orgNummer;

    if (fagsak.fagsakType === FagsakType.NORMAL || fagsak.fagsakType === FagsakType.SKJERMET_BARN) {
        return <VilkårsvurderingSkjemaNormal />;
    }

    if (fagsak.fagsakType === FagsakType.INSTITUSJON && samhandlerOrgnr) {
        return <VilkårsvurderingSkjemaInstitusjon />;
    }

    if (fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return <VilkårsvurderingSkjemaEnsligMindreårig />;
    }

    return null;
}
