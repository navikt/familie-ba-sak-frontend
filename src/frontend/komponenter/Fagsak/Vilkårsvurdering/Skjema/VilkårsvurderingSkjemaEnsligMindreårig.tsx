import React from 'react';

import { Alert } from '@navikt/ds-react';

import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { PersonType } from '../../../../typer/person';
import {
    AnnenVurderingType,
    annenVurderingConfig,
    vilkårConfigEnsligMindreårig,
    VilkårType,
    type IPersonResultat,
} from '../../../../typer/vilkår';
import PersonInformasjon from '../../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { PersonHeader, IndentertInnhold } from './VilkårsvurderingSkjemaNormal';

interface IProps {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjemaEnsligMindreårig: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { vilkårsvurdering } = useVilkårsvurdering();

    const personResultat = vilkårsvurdering.find(
        (value: IPersonResultat) => value.person.type === PersonType.BARN
    );
    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
    );
    return personResultat ? (
        <>
            <PersonHeader>
                <PersonInformasjon person={personResultat.person} somOverskrift />
            </PersonHeader>

            <IndentertInnhold>
                {personResultat.person.registerhistorikk ? (
                    <Registeropplysninger opplysninger={personResultat.person.registerhistorikk} />
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
