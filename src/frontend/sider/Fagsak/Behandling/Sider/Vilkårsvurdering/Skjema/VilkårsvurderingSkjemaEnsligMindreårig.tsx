import React from 'react';

import { Alert } from '@navikt/ds-react';

import { IndentertInnhold, PersonHeader } from './VilkårsvurderingSkjemaNormal';
import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import { useVilkårsvurderingContext } from '../../../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import PersonInformasjon from '../../../../../../komponenter/PersonInformasjon/PersonInformasjon';
import { PersonType } from '../../../../../../typer/person';
import type { IPersonResultat } from '../../../../../../typer/vilkår';
import {
    annenVurderingConfig,
    AnnenVurderingType,
    vilkårConfigEnsligMindreårig,
    VilkårType,
} from '../../../../../../typer/vilkår';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';

interface IProps {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjemaEnsligMindreårig: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { vurderErLesevisning } = useBehandling();
    const { vilkårsvurdering } = useVilkårsvurderingContext();

    const personResultat = vilkårsvurdering.find(
        (value: IPersonResultat) => value.person.type === PersonType.BARN
    );
    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
    );
    return personResultat ? (
        <>
            <PersonHeader>
                <PersonInformasjon
                    person={personResultat.person}
                    somOverskrift
                    erLesevisning={vurderErLesevisning()}
                />
            </PersonHeader>

            <IndentertInnhold>
                {personResultat.person.registerhistorikk ? (
                    <Registeropplysninger
                        registerHistorikk={personResultat.person.registerhistorikk}
                        fødselsdato={personResultat.person.fødselsdato}
                    />
                ) : (
                    <Alert variant="warning" children={'Klarte ikke hente registeropplysninger'} />
                )}
                {opplysningsplikt && (
                    <GeneriskAnnenVurdering
                        person={personResultat.person}
                        andreVurderinger={personResultat.andreVurderinger}
                        annenVurderingConfig={
                            annenVurderingConfig[AnnenVurderingType.OPPLYSNINGSPLIKT]
                        }
                        visFeilmeldinger={visFeilmeldinger}
                    />
                )}
                {Object.values(vilkårConfigEnsligMindreårig).map(vilkårConfig => {
                    if (vilkårConfig.key === VilkårType.UTVIDET_BARNETRYGD) {
                        if (
                            !personResultat.vilkårResultater.find(
                                vilkår => vilkår.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                            )
                        ) {
                            return null;
                        }
                    }
                    return (
                        <GeneriskVilkår
                            key={`${personResultat.person.fødselsdato}_${vilkårConfig.key}`}
                            generiskVilkårKey={`${personResultat.person.fødselsdato}_${vilkårConfig.key}`}
                            person={personResultat.person}
                            vilkårResultater={personResultat.vilkårResultater.filter(
                                vilkårResultat =>
                                    vilkårResultat.verdi.vilkårType === vilkårConfig.key
                            )}
                            vilkårFraConfig={vilkårConfig}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
            </IndentertInnhold>
        </>
    ) : (
        <Alert variant="error" children={'Finner ingen vilkår på behandlingen'} />
    );
};

export default VilkårsvurderingSkjemaEnsligMindreårig;
