import { Skjermstørrelse, useSkjermstørrelse } from '@hooks/useSkjermstørrelse';
import { PersonInformasjon } from '@komponenter/PersonInformasjon/PersonInformasjon';
import { PersonType } from '@typer/person';
import type { IPersonResultat } from '@typer/vilkår';
import { annenVurderingConfig, AnnenVurderingType, vilkårConfigEnsligMindreårig, VilkårType } from '@typer/vilkår';

import { Box, HStack, LocalAlert } from '@navikt/ds-react';

import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { useVilkårsvurderingContext } from '../VilkårsvurderingContext';
import styles from './VilkårsvurderingSkjema.module.css';

interface Props {
    visFeilmeldinger: boolean;
}

export function VilkårsvurderingSkjemaEnsligMindreårig({ visFeilmeldinger }: Props) {
    const { vilkårsvurdering } = useVilkårsvurderingContext();

    const skjermstørrelse = useSkjermstørrelse();

    const erStorSkjerm = skjermstørrelse > Skjermstørrelse['2XL'];
    const personResultat = vilkårsvurdering.find((value: IPersonResultat) => value.person.type === PersonType.BARN);
    const opplysningsplikt = personResultat?.andreVurderinger.find(
        value => value.verdi.type === AnnenVurderingType.OPPLYSNINGSPLIKT
    );

    if (!personResultat) {
        return (
            <LocalAlert status={'error'}>
                <LocalAlert.Header>
                    <LocalAlert.Title>Finner ingen vilkår på behandlingen</LocalAlert.Title>
                </LocalAlert.Header>
            </LocalAlert>
        );
    }

    return (
        <>
            <HStack
                wrap={false}
                justify={'space-between'}
                paddingBlock={'space-32 space-0'}
                className={styles.personLinje}
            >
                <PersonInformasjon person={personResultat.person} />
            </HStack>
            <Box paddingInline={erStorSkjerm ? 'space-56 space-0' : 'space-0'}>
                {personResultat.person.registerhistorikk ? (
                    <Registeropplysninger
                        registerHistorikk={personResultat.person.registerhistorikk}
                        fødselsdato={personResultat.person.fødselsdato}
                    />
                ) : (
                    <LocalAlert status={'warning'}>
                        <LocalAlert.Header>
                            <LocalAlert.Title>Klarte ikke hente registeropplysninger</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
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
    );
}
