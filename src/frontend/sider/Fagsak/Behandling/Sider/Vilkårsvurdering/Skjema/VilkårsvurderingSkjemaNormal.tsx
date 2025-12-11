import React, { Activity, useEffect, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, Button, HStack, List } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../../../../../context/AppContext';
import PersonInformasjon from '../../../../../../komponenter/PersonInformasjon/PersonInformasjon';
import { BehandlingSteg, BehandlingÅrsak, type IBehandling } from '../../../../../../typer/behandling';
import { PersonType } from '../../../../../../typer/person';
import { ToggleNavn } from '../../../../../../typer/toggles';
import type { IPersonResultat, IVilkårConfig, IVilkårResultat } from '../../../../../../typer/vilkår';
import { annenVurderingConfig, Resultat, vilkårConfig, VilkårType } from '../../../../../../typer/vilkår';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import GeneriskAnnenVurdering from '../GeneriskAnnenVurdering/GeneriskAnnenVurdering';
import GeneriskVilkår from '../GeneriskVilkår/GeneriskVilkår';
import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import { utledVilkårSomMåKontrolleresPerPerson } from '../utils';
import { useVilkårsvurderingContext, VilkårSubmit } from '../VilkårsvurderingContext';
import styles from './VilkårsvurderingSkjema.module.css';

interface IVilkårsvurderingSkjemaNormal {
    visFeilmeldinger: boolean;
}

const VilkårsvurderingSkjemaNormal: React.FunctionComponent<IVilkårsvurderingSkjemaNormal> = ({ visFeilmeldinger }) => {
    const { toggles } = useAppContext();
    const { vilkårsvurdering, settVilkårSubmit, postVilkår } = useVilkårsvurderingContext();
    const { vurderErLesevisning, erMigreringsbehandling, settÅpenBehandling, aktivSettPåVent, behandling } =
        useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const kanLeggeTilUtvidetVilkår =
        erMigreringsbehandling ||
        behandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
        behandling.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        behandling.årsak === BehandlingÅrsak.KLAGE ||
        behandling.årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO ||
        behandling.årsak === BehandlingÅrsak.IVERKSETTE_KA_VEDTAK;

    const personHarIkkevurdertVilkår = (personResultat: IPersonResultat) =>
        personResultat.vilkårResultater.some(
            vilkårResultatFelt => vilkårResultatFelt.verdi.resultat.verdi === Resultat.IKKE_VURDERT
        );

    const hentEkspantdertePersoner = () =>
        vilkårsvurdering.reduce(
            (personMapEkspandert, personResultat) => ({
                ...personMapEkspandert,
                [personResultat.personIdent]: erLesevisning || personHarIkkevurdertVilkår(personResultat),
            }),
            {}
        );

    const [personErEkspandert, settPersonErEkspandert] = useState<{ [key: string]: boolean }>(
        hentEkspantdertePersoner()
    );

    useEffect(() => {
        settPersonErEkspandert(hentEkspantdertePersoner());
    }, [aktivSettPåVent]);

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
        toggles[ToggleNavn.skalViseVarsellampeForManueltLagtTilBarn] &&
        vilkårSomMåKontrolleresPerPerson.length > 0 &&
        (behandling.steg == BehandlingSteg.VILKÅRSVURDERING || behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK);

    return (
        <>
            {skalViseVarselboksForVilkårSomMåKontrolleres && (
                <Alert variant="warning" contentMaxWidth={false} style={{ width: 'fit-content' }}>
                    <BodyShort>
                        {behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK
                            ? 'Automatisk utfylte vilkår som saksbehandler 1 ikke har gjort endringer på:'
                            : 'Vær oppmerksom:'}
                    </BodyShort>
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
                </Alert>
            )}
            {vilkårsvurdering.map((personResultat: IPersonResultat, index: number) => {
                const andreVurderinger = personResultat.andreVurderinger;
                const harUtvidet = personResultat.vilkårResultater.find(
                    vilkårResultat => vilkårResultat.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
                );

                return (
                    <div
                        key={`${index}_${personResultat.person.fødselsdato}`}
                        id={`${index}_${personResultat.person.fødselsdato}`}
                    >
                        <HStack
                            wrap={false}
                            justify={'space-between'}
                            paddingBlock={'space-32 space-0'}
                            className={styles.personLinje}
                        >
                            <PersonInformasjon
                                person={personResultat.person}
                                somOverskrift
                                erLesevisning={erLesevisning}
                            />
                            {!erLesevisning &&
                                personErEkspandert[personResultat.personIdent] &&
                                personResultat.person.type === PersonType.SØKER &&
                                !harUtvidet &&
                                kanLeggeTilUtvidetVilkår && (
                                    <Button
                                        variant={'tertiary'}
                                        id={`${index}_${personResultat.person.fødselsdato}__legg-til-vilkår-utvidet`}
                                        onClick={() => leggTilVilkårUtvidet(personResultat.personIdent)}
                                        size={'small'}
                                        icon={<PlusCircleIcon title="Legg til vilkår utvidet barnetrygd" />}
                                    >
                                        {`Legg til vilkår utvidet barnetrygd`}
                                    </Button>
                                )}
                            <Button
                                id={`vis-skjul-vilkårsvurdering-${index}_${personResultat.person.fødselsdato}}`}
                                variant="tertiary"
                                onClick={() =>
                                    settPersonErEkspandert({
                                        ...personErEkspandert,
                                        [personResultat.personIdent]: !personErEkspandert[personResultat.personIdent],
                                    })
                                }
                                icon={
                                    personErEkspandert[personResultat.personIdent] ? (
                                        <ChevronUpIcon aria-hidden />
                                    ) : (
                                        <ChevronDownIcon aria-hidden />
                                    )
                                }
                                iconPosition="right"
                            >
                                {personErEkspandert[personResultat.personIdent]
                                    ? 'Skjul vilkårsvurdering'
                                    : 'Vis vilkårsvurdering'}
                            </Button>
                        </HStack>
                        <Activity mode={personErEkspandert[personResultat.personIdent] ? 'visible' : 'hidden'}>
                            <Box paddingInline={'space-56 space-0'}>
                                <>
                                    {personResultat.person.registerhistorikk ? (
                                        <Registeropplysninger
                                            registerHistorikk={personResultat.person.registerhistorikk}
                                            fødselsdato={personResultat.person.fødselsdato}
                                        />
                                    ) : (
                                        <Alert variant="warning" children={'Klarte ikke hente registeropplysninger'} />
                                    )}
                                </>
                                {Object.values(vilkårConfig)
                                    .filter((vc: IVilkårConfig) =>
                                        vc.parterDetteGjelderFor.includes(personResultat.person.type)
                                    )
                                    .map((vc: IVilkårConfig) => {
                                        const vilkårResultater: FeltState<IVilkårResultat>[] =
                                            personResultat.vilkårResultater.filter(
                                                (vilkårResultat: FeltState<IVilkårResultat>) =>
                                                    vilkårResultat.verdi.vilkårType === vc.key
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
                    </div>
                );
            })}
        </>
    );
};

export default VilkårsvurderingSkjemaNormal;
