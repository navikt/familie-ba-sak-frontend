import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOpprettVilkårResultat } from '@hooks/useOpprettVilkårResultat';
import { PlusCircleIcon, ShieldLockFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Detail, ErrorMessage, Heading, HStack, List, LocalAlert, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { KopierVilkårFraSøkerTilBarna } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Skjema/KopierVilkårFraSøkerTilBarna';
import {
    BehandlingSteg,
    erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna,
    kanLeggeTilUtvidetVilkår,
} from '@typer/behandling';
import { PersonType } from '@typer/person';
import { annenVurderingConfig, VilkårType } from '@typer/vilkår';
import { useLocation } from 'react-router';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { GeneriskAnnenVurdering } from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import { GeneriskVilkår } from '../GeneriskVilkår/GeneriskVilkår';
import { utledVilkårSomMåKontrolleresPerPerson } from '../utils';
import { useVilkårsvurderingContext } from '../VilkårsvurderingContext';
import { finnValgtPersonIndex, finnVilkårForPerson, lagPersonHash, lagVilkårHash } from '../vilkårstatus';
import { Personkort } from './Personkort';
import styles from './VilkårsvurderingSkjema.module.css';

/** Konsept 2: viser kun personen som er valgt i personmenyen, med personkort og vilkårskort. */
export function VilkårsvurderingSkjemaKonsept2() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { vilkårsvurdering } = useVilkårsvurderingContext();
    const { hash } = useLocation();
    const erLesevisning = useErLesevisning();

    const valgtIndex = finnValgtPersonIndex(hash, vilkårsvurdering);

    const {
        mutate: opprettVilkårResultat,
        isPending: opprettVilkårResultatIsPending,
        error: opprettVilkårResultatError,
    } = useOpprettVilkårResultat({
        onSuccess: oppdatertBehandling => settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling)),
    });

    const leggTilVilkårUtvidet = (personIdent: string) =>
        opprettVilkårResultat({
            behandlingId: behandling.behandlingId,
            personIdent,
            vilkårType: VilkårType.UTVIDET_BARNETRYGD,
        });

    const vilkårSomMåKontrolleresPerPerson = Object.entries(
        utledVilkårSomMåKontrolleresPerPerson(behandling, vilkårsvurdering)
    );

    const skalViseVarselboksForVilkårSomMåKontrolleres =
        vilkårSomMåKontrolleresPerPerson.length > 0 &&
        (behandling.steg === BehandlingSteg.VILKÅRSVURDERING || behandling.steg === BehandlingSteg.BESLUTTE_VEDTAK);

    return (
        <>
            {skalViseVarselboksForVilkårSomMåKontrolleres && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            {behandling.steg === BehandlingSteg.BESLUTTE_VEDTAK
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
                if (index !== valgtIndex) {
                    return null;
                }
                const skrollHash = lagPersonHash(index, personResultat);
                const ident = personResultat.personIdent;
                const erSøker = personResultat.person.type === PersonType.SØKER;
                const andreVurderinger = personResultat.andreVurderinger;
                const personSkalSkjermesForBruker = personResultat.person.skjermesForBruker;
                const harUtvidet = personResultat.vilkårResultater.some(
                    vilkårResultat => vilkårResultat.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                );

                const skalKunneLeggeTilUtvidetBarnetrygdVilkår =
                    !erLesevisning && erSøker && !harUtvidet && kanLeggeTilUtvidetVilkår(behandling);

                const skalViseKopierVilkårFraSøkerTilBarna =
                    !erLesevisning && erSøker && erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

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
                            <VStack gap="space-16">
                                <Personkort key={ident} person={personResultat.person} />
                                <HStack justify="space-between" align="center" marginBlock="space-16 space-0">
                                    <Detail className={styles.seksjonsoverskrift}>Vilkår</Detail>
                                    {skalKunneLeggeTilUtvidetBarnetrygdVilkår && (
                                        <Button
                                            variant={'tertiary'}
                                            size={'small'}
                                            onClick={() => leggTilVilkårUtvidet(ident)}
                                            loading={opprettVilkårResultatIsPending}
                                            icon={<PlusCircleIcon title="Legg til vilkår utvidet barnetrygd" />}
                                        >
                                            Legg til vilkår utvidet barnetrygd
                                        </Button>
                                    )}
                                </HStack>
                                {erSøker && opprettVilkårResultatError && (
                                    <ErrorMessage>{opprettVilkårResultatError.message}</ErrorMessage>
                                )}
                                <div>
                                    {finnVilkårForPerson(personResultat).map(
                                        ({ vilkårFraConfig, vilkårResultater }) => (
                                            <GeneriskVilkår
                                                key={vilkårFraConfig.key}
                                                generiskVilkårKey={lagVilkårHash(skrollHash, vilkårFraConfig)}
                                                person={personResultat.person}
                                                vilkårResultater={vilkårResultater}
                                                vilkårFraConfig={vilkårFraConfig}
                                            />
                                        )
                                    )}
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
                                                />
                                            ))}
                                </div>
                                {skalViseKopierVilkårFraSøkerTilBarna && <KopierVilkårFraSøkerTilBarna />}
                            </VStack>
                        )}
                    </div>
                );
            })}
        </>
    );
}
