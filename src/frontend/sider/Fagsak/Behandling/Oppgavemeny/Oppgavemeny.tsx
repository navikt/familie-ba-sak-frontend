import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import { dekodAnker } from '@hooks/useScrollTilAnker';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Detail, Heading, HStack, Stack, ToggleGroup, VStack } from '@navikt/ds-react';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import { PersonType, personTypeMap } from '@typer/person';
import { type IPersonResultat, Resultat } from '@typer/vilkår';
import { hentAlder } from '@utils/formatter';
import classNames from 'classnames';
import { Activity, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { erSidenAktiv, sider } from '../Sider/sider';
import { mapFraRestPersonResultatTilPersonResultat } from '../Sider/Vilkårsvurdering/utils';
import {
    finnVilkårForPerson,
    lagPersonHash,
    lagVilkårHash,
    utledVilkårstatus,
    Vilkårstatus,
    vilkårstatusVisningsnavn,
} from '../Sider/Vilkårsvurdering/vilkårstatus';
import { useVenstremeny } from '../Venstremeny/useVenstremeny';
import Styles from './Oppgavemeny.module.css';

enum Visning {
    ALLE_VILKÅR = 'ALLE_VILKÅR',
    OPPGAVER = 'OPPGAVER',
}

interface Element {
    nøkkel: string;
    tittel: string;
    undertittel: string;
    anker: string;
    erOppgave: boolean;
}

interface Gruppe {
    nøkkel: string;
    etikett: string;
    elementer: Element[];
}

function lagGruppe(
    personResultat: IPersonResultat,
    index: number,
    barnenummer: number,
    behandling: IBehandling
): Gruppe {
    const { person } = personResultat;
    const personHash = lagPersonHash(index, personResultat);
    const erSøker = person.type === PersonType.SØKER;
    const etikett = erSøker ? personTypeMap[person.type] : `${personTypeMap[person.type]} ${barnenummer}`;
    const personbeskrivelse = `${personTypeMap[person.type]} (${hentAlder(person.fødselsdato)} år)`;
    const erPåVilkårsvurdering = behandling.steg === BehandlingSteg.VILKÅRSVURDERING;

    if (person.skjermesForBruker) {
        return { nøkkel: personHash, etikett, elementer: [] };
    }

    const elementer: Element[] = [];

    if (erPåVilkårsvurdering && behandling.søknadsgrunnlag?.erAutomatiskRegistrert && person.erManueltLagtTilISøknad) {
        elementer.push({
            nøkkel: `${personHash}_relasjon`,
            tittel: 'Har ikke relasjon til søker i PDL',
            undertittel: personbeskrivelse,
            anker: personHash,
            erOppgave: true,
        });
    }

    finnVilkårForPerson(personResultat).forEach(({ vilkårFraConfig, vilkårResultater }) => {
        const status = utledVilkårstatus(vilkårResultater);
        const anker = lagVilkårHash(personHash, vilkårFraConfig);
        const undertittel = `${personbeskrivelse} • ${vilkårstatusVisningsnavn[status]}`;

        elementer.push({
            nøkkel: anker,
            tittel: vilkårFraConfig.tittel,
            undertittel,
            anker,
            erOppgave: status === Vilkårstatus.IKKE_VURDERT,
        });

        // Det automatiske løpet ber saksbehandler kontrollere enkelte preutfylte vilkår, f.eks. «Avklar barnets bosted»
        if (erPåVilkårsvurdering) {
            vilkårResultater
                .filter(vr => vr.erOpprinneligPreutfyltIBehandling === behandling.behandlingId)
                .forEach(vr => {
                    if (vr.begrunnelseForManuellKontroll) {
                        elementer.push({
                            nøkkel: `${anker}_${vr.id}`,
                            tittel: vr.begrunnelseForManuellKontroll,
                            undertittel,
                            anker,
                            erOppgave: true,
                        });
                    }
                });
        }
    });

    return { nøkkel: personHash, etikett, elementer };
}

export function Oppgavemeny() {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const { pathname, hash } = useLocation();

    const [erÅpen, settErÅpen] = useVenstremeny();
    const [visning, settVisning] = useState(Visning.OPPGAVER);

    const grupper = useMemo(() => {
        const vilkårsvurdering = mapFraRestPersonResultatTilPersonResultat(
            behandling.personResultater,
            behandling.personer
        );
        let barnenummer = 0;
        return vilkårsvurdering.map((personResultat, index) => {
            if (personResultat.person.type === PersonType.BARN) {
                barnenummer += 1;
            }
            return lagGruppe(personResultat, index, barnenummer, behandling);
        });
    }, [behandling]);

    const vilkårsvurderingPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${sider.VILKÅRSVURDERING.href}`;
    const kanNavigere = erSidenAktiv(sider.VILKÅRSVURDERING, behandling);
    const aktivtAnker = pathname.endsWith(sider.VILKÅRSVURDERING.href) ? dekodAnker(hash.replace(/^#/, '')) : '';

    const alleElementer = grupper.flatMap(gruppe => gruppe.elementer);
    const antallOppgaver = alleElementer.filter(element => element.erOppgave).length;
    const antallUavklarteVilkår = behandling.personResultater
        .flatMap(personResultat => personResultat.vilkårResultater)
        .filter(vilkårResultat => vilkårResultat.resultat === Resultat.IKKE_VURDERT).length;

    const synligeGrupper =
        visning === Visning.OPPGAVER
            ? grupper
                  .map(gruppe => ({ ...gruppe, elementer: gruppe.elementer.filter(element => element.erOppgave) }))
                  .filter(gruppe => gruppe.elementer.length > 0)
            : grupper;

    function lagKort(element: Element) {
        const className = classNames(Styles.kort, {
            [Styles.oppgave]: element.erOppgave,
            [Styles.aktiv]: element.anker === aktivtAnker,
            [Styles.inaktiv]: !kanNavigere,
        });
        const innhold = (
            <HStack gap="space-8" align="center" justify="space-between" wrap={false}>
                <VStack gap="space-2">
                    <BodyShort size="small" weight="semibold" className={Styles.tittel}>
                        {element.tittel}
                    </BodyShort>
                    {visning === Visning.OPPGAVER && <Detail>{element.undertittel}</Detail>}
                </VStack>
                <ArrowRightIcon aria-hidden fontSize="1.25rem" className={Styles.pil} />
            </HStack>
        );
        return (
            <li key={element.nøkkel}>
                {kanNavigere ? (
                    <Link to={`${vilkårsvurderingPath}#${element.anker}`} className={className} draggable={false}>
                        {innhold}
                    </Link>
                ) : (
                    <span className={className}>{innhold}</span>
                )}
            </li>
        );
    }

    return (
        <Stack direction="row-reverse">
            <Button
                title={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                aria-label={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                className={Styles.knapp}
                variant="secondary"
                size="small"
                icon={erÅpen ? <ChevronLeftIcon aria-hidden /> : <ChevronRightIcon aria-hidden />}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <Box as="nav" aria-label="Oppgaver i behandlingen" width="clamp(16rem, 17vw, 22rem)" padding="space-16">
                    <VStack gap="space-12">
                        <Heading size="small" level="2">
                            Vilkår
                        </Heading>
                        <ToggleGroup
                            size="small"
                            data-color="neutral"
                            value={visning}
                            onChange={verdi => settVisning(verdi as Visning)}
                            aria-label="Velg visning"
                            fill
                        >
                            <ToggleGroup.Item value={Visning.ALLE_VILKÅR} label="Alle vilkår" />
                            <ToggleGroup.Item value={Visning.OPPGAVER} label="Oppgaver" />
                        </ToggleGroup>
                        {visning === Visning.OPPGAVER && antallOppgaver > 0 && (
                            <Detail>{`${antallOppgaver} oppgaver · ${antallUavklarteVilkår} uavklarte vilkår`}</Detail>
                        )}
                        {synligeGrupper.length === 0 && (
                            <Detail className={Styles.gruppeetikett}>Alle vilkår vurdert</Detail>
                        )}
                        {synligeGrupper.map(gruppe => (
                            <VStack key={gruppe.nøkkel} gap="space-8">
                                <Detail className={Styles.gruppeetikett}>{gruppe.etikett}</Detail>
                                {gruppe.elementer.length === 0 ? (
                                    <Detail>Skjermet person</Detail>
                                ) : (
                                    <VStack as="ul" gap="space-8" className={Styles.liste}>
                                        {gruppe.elementer.map(lagKort)}
                                    </VStack>
                                )}
                            </VStack>
                        ))}
                        {visning === Visning.OPPGAVER && (
                            <Button
                                variant="tertiary"
                                size="small"
                                icon={<ArrowRightIcon aria-hidden />}
                                iconPosition="right"
                                className={Styles.seAlle}
                                onClick={() => settVisning(Visning.ALLE_VILKÅR)}
                            >
                                Se alle vilkår
                            </Button>
                        )}
                    </VStack>
                </Box>
            </Activity>
        </Stack>
    );
}
