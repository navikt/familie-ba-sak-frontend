import React from 'react';

import { Alert } from '@navikt/ds-react';

import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { PersonType } from '../../../../typer/person';
import { vilkårConfigEnsligMindreårig, type IPersonResultat } from '../../../../typer/vilkår';
import PersonInformasjon from '../../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
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
                {Object.values(vilkårConfigEnsligMindreårig).map(vilkårConfig => {
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
