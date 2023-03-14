import React from 'react';

import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../../context/fagsak/FagsakContext';
import { FagsakType } from '../../../../typer/fagsak';
import VilkårsvurderingSkjemaEnsligMindreårig from './VilkårsvurderingSkjemaEnsligMindreårig';
import VilkårsvurderingSkjemaInstitusjon from './VilkårsvurderingSkjemaInstitusjon';
import VilkårsvurderingSkjemaOrdinær from './VilkårsvurderingSkjemaOrdinær';

interface IProps {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjema: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();
    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

    const { samhandlerOrgnr } = useBehandling();

    if (minimalFagsak?.fagsakType === FagsakType.NORMAL) {
        return <VilkårsvurderingSkjemaOrdinær visFeilmeldinger={visFeilmeldinger} />;
    }
    if (minimalFagsak?.fagsakType === FagsakType.INSTITUSJON && samhandlerOrgnr) {
        return (
            <VilkårsvurderingSkjemaInstitusjon
                visFeilmeldinger={visFeilmeldinger}
                orgNummer={samhandlerOrgnr}
            />
        );
    }
    if (minimalFagsak?.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return <VilkårsvurderingSkjemaEnsligMindreårig visFeilmeldinger={visFeilmeldinger} />;
    }
    return null;
};

export default VilkårsvurderingSkjema;
