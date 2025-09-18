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
    const { fagsak } = useFagsakContext();

    const { samhandlerOrgnr } = useBehandlingContext();

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
};

export default VilkårsvurderingSkjema;
