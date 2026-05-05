import { Activity } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { Skjermstørrelse, useSkjermstørrelse } from '@hooks/useSkjermstørrelse';
import { PersonInformasjon } from '@komponenter/PersonInformasjon/PersonInformasjon';
import { BehandlingSteg, type IBehandling, kanLeggeTilUtvidetVilkår } from '@typer/behandling';
import { FeatureToggle } from '@typer/featureToggles';
import { PersonType } from '@typer/person';
import { annenVurderingConfig, harPersonIkkeVurdertVilkår, vilkårConfig, VilkårType } from '@typer/vilkår';

import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon, ShieldLockFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading, HStack, List, LocalAlert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { EkspanderVilkårsvurderingProvider } from './EkspanderVilkårsvurderingContext';
import styles from './VilkårsvurderingSkjema.module.css';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { utledVilkårSomMåKontrolleresPerPerson } from '../utils';
import { useVilkårsvurderingContext, VilkårSubmit } from '../VilkårsvurderingContext';

interface IVilkårsvurderingSkjemaNormal {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjemaNormal = ({ visFeilmeldinger }: IVilkårsvurderingSkjemaNormal) => {
    const { vilkårsvurdering, settVilkårSubmit, postVilkår } = useVilkårsvurderingContext();
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const toggles = useFeatureToggles();
    const skjermstørrelse = useSkjermstørrelse();
    const erLesevisning = useErLesevisning();

    const leggTilVilkårUtvidet = (personIdent: string) => {
        const promise = postVilkår(personIdent, VilkårType.UTVIDET_BARNETRYGD);
        promise.then((oppdatertBehandling: Ressurs<IBehandling>) => {
            settVilkårSubmit(VilkårSubmit.NONE);
            if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(oppdatertBehandling);
            }
        });
    };

    const vilkårSomMåKontrolleresPerPerson = Object.entries(
        utledVilkårSomMåKontrolleresPerPerson(behandling, vilkårsvurdering)
    );

    const skalViseVarselboksForVilkårSomMåKontrolleres =
        toggles[FeatureToggle.skalViseVarsellampeForManueltLagtTilBarn] &&
        vilkårSomMåKontrolleresPerPerson.length > 0 &&
        (behandling.steg == BehandlingSteg.VILKÅRSVURDERING || behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK);

    return (
        <>
            {skalViseVarselboksForVilkårSomMåKontrolleres && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            {behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK
                                ? 'Automatisk utfylte vilkår som saksbehandler 1 ikke har gjort endringer på:'
                                : 'Vær oppmerksom:'}
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <List as="ul">
                            {vilkårSomMåKontrolleresPerPerson.map(([navn, avvik]) => (
                                <List.Item key={navn}>
                                    {navn}
                                    <List as="ul" size="small">
                                        {avvik.map(avvik => (
                                            <List.Item key={avvik}>
                                                <BodyShort size="small">{avvik}</BodyShort>
                                            </List.Item>
                                        ))}
                                    </List>
                                </List.Item>
                            ))}
                        </List>
                    </LocalAlert.Content>
                </LocalAlert>
            )}
            {vilkårsvurdering.map((personResultat, index) => {
                const andreVurderinger = personResultat.andreVurderinger;
                const harUtvidet = personResultat.vilkårResultater.find(
                    vilkårResultat => vilkårResultat.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                );
                const personSkalSkjermesForBruker = personResultat.person.skjermesForBruker;

                const skalKunneLeggeTilUtvidetBarnetrygdVilkår =
                    !erLesevisning &&
                    personResultat.person.type === PersonType.SØKER &&
                    !harUtvidet &&
                    kanLeggeTilUtvidetVilkår(behandling);

                return (
                    <EkspanderVilkårsvurderingProvider
                        key={personResultat.person.personIdent}
                        starterEkspandert={erLesevisning || harPersonIkkeVurdertVilkår(personResultat)}
                    >
                        {({ ekspandert, ekspander }) => (
                            <div id={`${index}_${personResultat.person.fødselsdato}`}>
                                {personSkalSkjermesForBruker ? (
                                    <HStack gap="space-24" wrap={false} align="center">
                                        <ShieldLockFillIcon
                                            fontSize="2.5rem"
                                            color="var(--ax-warning-500)"
                                            style={{ margin: '-0.25rem' }}
                                        />{' '}
                                        <Heading level="2" size="medium">
                                            {personResultat.person.navn}
                                        </Heading>
                                    </HStack>
                                ) : (
                                    <>
                                        <HStack
                                            gap={'space-8'}
                                            justify={'space-between'}
                                            wrap={true}
                                            className={styles.personLinje}
                                        >
                                            <PersonInformasjon person={personResultat.person} />
                                            <HStack gap={'space-8'} justify={'space-between'} wrap={false}>
                                                {ekspandert && skalKunneLeggeTilUtvidetBarnetrygdVilkår && (
                                                    <Button
                                                        variant={'tertiary'}
                                                        size={skjermstørrelse > Skjermstørrelse.XL ? 'medium' : 'small'}
                                                        onClick={() => leggTilVilkårUtvidet(personResultat.personIdent)}
                                                        icon={
                                                            <PlusCircleIcon title="Legg til vilkår utvidet barnetrygd" />
                                                        }
                                                    >
                                                        Legg til vilkår utvidet barnetrygd
                                                    </Button>
                                                )}
                                                <Button
                                                    variant={'tertiary'}
                                                    size={skjermstørrelse > Skjermstørrelse.XL ? 'medium' : 'small'}
                                                    onClick={ekspander}
                                                    icon={
                                                        ekspandert ? (
                                                            <ChevronUpIcon aria-hidden />
                                                        ) : (
                                                            <ChevronDownIcon aria-hidden />
                                                        )
                                                    }
                                                    iconPosition={'right'}
                                                >
                                                    {ekspandert ? 'Skjul vilkårsvurdering' : 'Vis vilkårsvurdering'}
                                                </Button>
                                            </HStack>
                                        </HStack>
                                        <Activity mode={ekspandert ? 'visible' : 'hidden'}>
                                            <Box
                                                paddingInline={
                                                    skjermstørrelse > Skjermstørrelse.XL
                                                        ? 'space-56 space-0'
                                                        : 'space-0'
                                                }
                                            >
                                                {personResultat.person.registerhistorikk ? (
                                                    <Registeropplysninger
                                                        registerHistorikk={personResultat.person.registerhistorikk}
                                                        fødselsdato={personResultat.person.fødselsdato}
                                                    />
                                                ) : (
                                                    <LocalAlert status="warning">
                                                        <LocalAlert.Header>
                                                            <LocalAlert.Title>
                                                                Klarte ikke hente registeropplysninger
                                                            </LocalAlert.Title>
                                                        </LocalAlert.Header>
                                                    </LocalAlert>
                                                )}
                                                {Object.values(vilkårConfig)
                                                    .filter(vc =>
                                                        vc.parterDetteGjelderFor.includes(personResultat.person.type)
                                                    )
                                                    .map(vc => {
                                                        const vilkårResultater = personResultat.vilkårResultater.filter(
                                                            vilkårResultat => vilkårResultat.verdi.vilkårType === vc.key
                                                        );

                                                        if (
                                                            vilkårResultater.length === 0 &&
                                                            personResultat.person.type === PersonType.SØKER
                                                        )
                                                            return undefined;
                                                        // For barn ønsker vi alltid å rendre alle vilkår slik at man evt kan legge til tom periode
                                                        else
                                                            return (
                                                                <GeneriskVilkår
                                                                    key={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                                                                    generiskVilkårKey={`${index}_${personResultat.person.fødselsdato}_${vc.key}`}
                                                                    person={personResultat.person}
                                                                    vilkårResultater={vilkårResultater}
                                                                    vilkårFraConfig={vc}
                                                                    visFeilmeldinger={visFeilmeldinger}
                                                                />
                                                            );
                                                    })}
                                                {andreVurderinger.length > 0 &&
                                                    Object.values(annenVurderingConfig)
                                                        .filter(annenVurderingConfig =>
                                                            annenVurderingConfig.parterDetteGjelderFor.includes(
                                                                personResultat.person.type
                                                            )
                                                        )
                                                        .map(annenVurderingConfig => (
                                                            <GeneriskAnnenVurdering
                                                                key={`${index}_${personResultat.person.fødselsdato}_${annenVurderingConfig.key}`}
                                                                person={personResultat.person}
                                                                andreVurderinger={personResultat.andreVurderinger}
                                                                annenVurderingConfig={annenVurderingConfig}
                                                                visFeilmeldinger={visFeilmeldinger}
                                                            />
                                                        ))}
                                            </Box>
                                        </Activity>
                                    </>
                                )}
                            </div>
                        )}
                    </EkspanderVilkårsvurderingProvider>
                );
            })}
        </>
    );
};

export default VilkårsvurderingSkjemaNormal;
