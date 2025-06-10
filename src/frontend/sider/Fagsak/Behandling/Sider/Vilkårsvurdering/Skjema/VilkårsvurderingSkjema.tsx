import React from 'react';

import VilkårsvurderingSkjemaEnsligMindreårig from './VilkårsvurderingSkjemaEnsligMindreårig';
import VilkårsvurderingSkjemaInstitusjon from './VilkårsvurderingSkjemaInstitusjon';
import VilkårsvurderingSkjemaNormal from './VilkårsvurderingSkjemaNormal';
import { FagsakType } from '../../../../../../typer/fagsak';
import { useFagsakContext } from '../../../../FagsakContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface IProps {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjema: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { minimalFagsak } = useFagsakContext();

    const { samhandlerOrgnr } = useBehandlingContext();

    if (
        minimalFagsak?.fagsakType === FagsakType.NORMAL ||
        minimalFagsak?.fagsakType === FagsakType.SKJERMET_BARN
    ) {
        return <VilkårsvurderingSkjemaNormal visFeilmeldinger={visFeilmeldinger} />;
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
