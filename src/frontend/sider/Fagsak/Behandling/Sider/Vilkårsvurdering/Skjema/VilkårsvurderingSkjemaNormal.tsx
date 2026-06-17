import { Activity } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import { Skjermstørrelse, useSkjermstørrelse } from '@hooks/useSkjermstørrelse';
import { PersonInformasjon } from '@komponenter/PersonInformasjon/PersonInformasjon';
import { useEkspanderbareVilkårsvurderingPaneler } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårsvurderingPanelerContext';
import { KopierVilkårFraSøkerTilBarna } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Skjema/KopierVilkårFraSøkerTilBarna';
import {
    BehandlingSteg,
    erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna,
    type IBehandling,
    kanLeggeTilUtvidetVilkår,
} from '@typer/behandling';
import { PersonType } from '@typer/person';
import { annenVurderingConfig, vilkårConfig, VilkårType } from '@typer/vilkår';

import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon, ShieldLockFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading, HStack, List, LocalAlert, Stack } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import styles from './VilkårsvurderingSkjema.module.css';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { utledVilkårSomMåKontrolleresPerPerson } from '../utils';
import { useVilkårsvurderingContext, VilkårSubmit } from '../VilkårsvurderingContext';

interface Props {
    visFeilmeldinger: boolean;
}

export function VilkårsvurderingSkjemaNormal({ visFeilmeldinger }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { vilkårsvurdering, settVilkårSubmit, postVilkår } = useVilkårsvurderingContext();
    const { erPanelEkspandert, togglePanel } = useEkspanderbareVilkårsvurderingPaneler();

    const skjermstørrelse = useSkjermstørrelse();
    const erLesevisning = useErLesevisning();

    const erStorSkjerm = skjermstørrelse > Skjermstørrelse['2XL'];

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
                const skrollHash = `${index}_${personResultat.person.fødselsdato}`;
                const ident = personResultat.personIdent;
                const erSøker = personResultat.person.type === PersonType.SØKER;
                const andreVurderinger = personResultat.andreVurderinger;
                const personSkalSkjermesForBruker = personResultat.person.skjermesForBruker;
                const harUtvidet = personResultat.vilkårResultater.find(
                    vilkårResultat => vilkårResultat.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                );

                const skalKunneLeggeTilUtvidetBarnetrygdVilkår =
                    !erLesevisning && erSøker && !harUtvidet && kanLeggeTilUtvidetVilkår(behandling);

                const skalViseKopierVilkårFraSøkerTilBarna =
                    erSøker && erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

                const erEkspandert = erPanelEkspandert(ident);

                return (
                    <div key={personResultat.person.personIdent} id={skrollHash}>
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
                                <Stack
                                    direction={erStorSkjerm ? 'row' : 'column'}
                                    gap={'space-8'}
                                    justify={'space-between'}
                                    wrap={true}
                                    className={styles.personLinje}
                                >
                                    <PersonInformasjon person={personResultat.person} />
                                    <HStack gap={'space-8'} justify={'space-between'} wrap={false}>
                                        {erEkspandert && skalKunneLeggeTilUtvidetBarnetrygdVilkår && (
                                            <Button
                                                variant={'tertiary'}
                                                size={erStorSkjerm ? 'medium' : 'small'}
                                                onClick={() => leggTilVilkårUtvidet(ident)}
                                                icon={<PlusCircleIcon title="Legg til vilkår utvidet barnetrygd" />}
                                            >
                                                Legg til vilkår utvidet barnetrygd
                                            </Button>
                                        )}
                                        <Button
                                            variant={'tertiary'}
                                            size={erStorSkjerm ? 'medium' : 'small'}
                                            onClick={() => togglePanel(ident)}
                                            icon={
                                                erEkspandert ? (
                                                    <ChevronUpIcon aria-hidden />
                                                ) : (
                                                    <ChevronDownIcon aria-hidden />
                                                )
                                            }
                                            iconPosition={'right'}
                                        >
                                            {erEkspandert ? 'Skjul vilkårsvurdering' : 'Vis vilkårsvurdering'}
                                        </Button>
                                    </HStack>
                                </Stack>
                                <Activity mode={erEkspandert ? 'visible' : 'hidden'}>
                                    <Box paddingInline={erStorSkjerm ? 'space-56 space-0' : 'space-0'}>
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
                                            .filter(vc => vc.parterDetteGjelderFor.includes(personResultat.person.type))
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
                                                            key={vc.key}
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
                                                        key={annenVurderingConfig.key}
                                                        person={personResultat.person}
                                                        andreVurderinger={personResultat.andreVurderinger}
                                                        annenVurderingConfig={annenVurderingConfig}
                                                        visFeilmeldinger={visFeilmeldinger}
                                                    />
                                                ))}
                                        {skalViseKopierVilkårFraSøkerTilBarna && <KopierVilkårFraSøkerTilBarna />}
                                    </Box>
                                </Activity>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}
