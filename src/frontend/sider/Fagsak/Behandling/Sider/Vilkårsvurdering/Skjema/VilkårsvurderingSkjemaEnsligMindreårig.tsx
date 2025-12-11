import React from 'react';

import { Alert, Box, HStack } from '@navikt/ds-react';

import PersonInformasjon from '../../../../../../komponenter/PersonInformasjon/PersonInformasjon';
import { PersonType } from '../../../../../../typer/person';
import type { IPersonResultat } from '../../../../../../typer/vilkår';
import {
    annenVurderingConfig,
    AnnenVurderingType,
    vilkårConfigEnsligMindreårig,
    VilkårType,
} from '../../../../../../typer/vilkår';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { useVilkårsvurderingContext } from '../VilkårsvurderingContext';
import styles from './VilkårsvurderingSkjema.module.css';

interface IProps {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjemaEnsligMindreårig: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { vilkårsvurdering } = useVilkårsvurderingContext();

    const personResultat = vilkårsvurdering.find((value: IPersonResultat) => value.person.type === PersonType.BARN);

    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
    );
    return personResultat ? (
        <>
            <HStack
                wrap={false}
                justify={'space-between'}
                paddingBlock={'space-32 space-0'}
                className={styles.personLinje}
            >
                <PersonInformasjon person={personResultat.person} somOverskrift erLesevisning={vurderErLesevisning()} />
            </HStack>

            <Box paddingInline={'space-56 space-0'}>
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
                        annenVurderingConfig={annenVurderingConfig[AnnenVurderingType.OPPLYSNINGSPLIKT]}
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
                                vilkårResultat => vilkårResultat.verdi.vilkårType === vilkårConfig.key
                            )}
                            vilkårFraConfig={vilkårConfig}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
            </Box>
        </>
    ) : (
        <Alert variant="error" children={'Finner ingen vilkår på behandlingen'} />
    );
};

export default VilkårsvurderingSkjemaEnsligMindreårig;
