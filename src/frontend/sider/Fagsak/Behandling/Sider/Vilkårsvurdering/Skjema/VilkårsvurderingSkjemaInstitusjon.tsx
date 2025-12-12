import React from 'react';

import { Alert, Bleed, Box, HStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import PersonInformasjon from '../../../../../../komponenter/PersonInformasjon/PersonInformasjon';
import SamhandlerInformasjon from '../../../../../../komponenter/Samhandler/SamhandlerInformasjon';
import { useSamhandlerRequest } from '../../../../../../komponenter/Samhandler/useSamhandler';
import { PersonType } from '../../../../../../typer/person';
import type { IPersonResultat } from '../../../../../../typer/vilkår';
import { annenVurderingConfig, AnnenVurderingType, vilkårConfigInstitusjon } from '../../../../../../typer/vilkår';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { useVilkårsvurderingContext } from '../VilkårsvurderingContext';
import styles from './VilkårsvurderingSkjema.module.css';

interface IProps {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjemaInstitusjon: React.FunctionComponent<IProps> = ({ visFeilmeldinger }) => {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { vilkårsvurdering } = useVilkårsvurderingContext();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);

    if (samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(behandling.behandlingId);
    }

    const personResultat = vilkårsvurdering.find((value: IPersonResultat) => value.person.type === PersonType.BARN);
    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
    );

    return personResultat ? (
        <>
            {opplysningsplikt && (
                <>
                    <HStack paddingBlock={'space-56 space-32'} justify={'space-between'} className={styles.personLinje}>
                        {samhandlerRessurs.status === RessursStatus.SUKSESS ? (
                            <SamhandlerInformasjon samhandler={samhandlerRessurs.data} somOverskrift />
                        ) : (
                            <Alert variant="warning" children={'Klarte ikke hente opplysninger om institusjon'} />
                        )}
                    </HStack>
                    <Bleed marginBlock={'space-0 space-24'}>
                        <Box paddingInline={'space-56 space-0'}>
                            <GeneriskAnnenVurdering
                                person={personResultat.person}
                                andreVurderinger={personResultat.andreVurderinger}
                                annenVurderingConfig={annenVurderingConfig[AnnenVurderingType.OPPLYSNINGSPLIKT]}
                                visFeilmeldinger={visFeilmeldinger}
                            />
                        </Box>
                    </Bleed>
                </>
            )}
            <HStack paddingBlock={'space-56 space-32'} justify={'space-between'} className={styles.personLinje}>
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
                {vilkårConfigInstitusjon.map(vilkårConfig => {
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

export default VilkårsvurderingSkjemaInstitusjon;
