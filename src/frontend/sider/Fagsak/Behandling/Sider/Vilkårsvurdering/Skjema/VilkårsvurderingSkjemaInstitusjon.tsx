import { useBehandlingId } from '@hooks/useBehandlingId';
import { Skjermstørrelse, useSkjermstørrelse } from '@hooks/useSkjermstørrelse';
import { PersonInformasjon } from '@komponenter/PersonInformasjon/PersonInformasjon';
import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { PersonType } from '@typer/person';
import type { IPersonResultat } from '@typer/vilkår';
import { annenVurderingConfig, AnnenVurderingType, vilkårConfigInstitusjon } from '@typer/vilkår';

import { Bleed, Box, HStack, LocalAlert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import SamhandlerInformasjon from '../../../../../../komponenter/Samhandler/SamhandlerInformasjon';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { useVilkårsvurderingContext } from '../VilkårsvurderingContext';
import styles from './VilkårsvurderingSkjema.module.css';

interface Props {
    visFeilmeldinger: boolean;
}

export function VilkårsvurderingSkjemaInstitusjon({ visFeilmeldinger }: Props) {
    const { vilkårsvurdering } = useVilkårsvurderingContext();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);

    const behandlingId = useBehandlingId();
    const skjermstørrelse = useSkjermstørrelse();

    if (samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(behandlingId);
    }

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
            {opplysningsplikt && (
                <>
                    <HStack paddingBlock={'space-56 space-32'} justify={'space-between'} className={styles.personLinje}>
                        {samhandlerRessurs.status === RessursStatus.SUKSESS ? (
                            <SamhandlerInformasjon samhandler={samhandlerRessurs.data} somOverskrift />
                        ) : (
                            <LocalAlert status={'warning'}>
                                <LocalAlert.Header>
                                    <LocalAlert.Title>Klarte ikke hente opplysninger om institusjon</LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        )}
                    </HStack>
                    <Bleed marginBlock={'space-0 space-24'}>
                        <Box paddingInline={erStorSkjerm ? 'space-56 space-0' : 'space-0'}>
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
            <HStack paddingBlock={'space-32'} justify={'space-between'} className={styles.personLinje}>
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
    );
}
