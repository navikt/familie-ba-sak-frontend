import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOpprettVilkårResultat } from '@hooks/useOpprettVilkårResultat';
import { ChevronDownIcon, ChevronUpIcon, LightBulbFillIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, Heading, HStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbareVilkårResultatRader } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { BehandlingSteg, Behandlingstype, type IBehandling } from '@typer/behandling';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import type { IRestVilkårResultat, IVilkårConfig } from '@typer/vilkår';
import { Resultat, VilkårType } from '@typer/vilkår';
import classNames from 'classnames';
import { Activity, useState } from 'react';
import { utledVilkårstatus, type Vilkårstatus } from '../vilkårstatus';
import { FjernUtvidetBarnetrygdVilkår } from './FjernUtvidetBarnetrygdVilkår';
import styles from './GeneriskVilkår.module.css';
import { VilkårTabell } from './VilkårTabell';

const statusklasse: Record<Vilkårstatus, string> = {
    IKKE_VURDERT: styles.ikkeVurdert,
    TRENGER_OPPMERKSOMHET: styles.trengerOppmerksomhet,
    VURDERT: styles.vurdert,
};

interface Props {
    person: IGrunnlagPerson;
    vilkårResultater: IRestVilkårResultat[];
    vilkårFraConfig: IVilkårConfig;
    generiskVilkårKey: string;
}

export function GeneriskVilkår({ person, vilkårFraConfig, vilkårResultater, generiskVilkårKey }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { ekspanderRad } = useEkspanderbareVilkårResultatRader();
    const erLesevisning = useErLesevisning();
    const [erÅpen, settErÅpen] = useState(true);

    const vilkårstatus = utledVilkårstatus(vilkårResultater, behandling);

    const leggTilPeriodeKnappId = `${generiskVilkårKey}__legg_til_periode`;

    const settFokusPåLeggTilPeriodeKnapp = () => {
        document.getElementById(leggTilPeriodeKnappId)?.focus();
    };

    function åpneNyeIkkeVurdertVilkårResultat(oppdatertBehandling: IBehandling) {
        // Dette er gjort slik siden APIet ikke returnerer IDen til det opprettede vilkår resultatet.
        const eksisterendeVilkårResultatIder = behandling.personResultater
            .flatMap(it => it.vilkårResultater)
            .map(it => it.id);

        oppdatertBehandling.personResultater
            .flatMap(it => it.vilkårResultater)
            .filter(it => it.resultat === Resultat.IKKE_VURDERT)
            .filter(it => !eksisterendeVilkårResultatIder.includes(it.id))
            .forEach(it => {
                ekspanderRad(it.id);
            });
    }

    const {
        mutate: opprettVilkårResultat,
        isPending: opprettVilkårResultatIsPending,
        error: opprettVilkårResultatError,
    } = useOpprettVilkårResultat({
        onSuccess: oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            åpneNyeIkkeVurdertVilkårResultat(oppdatertBehandling);
        },
    });

    const skalViseLeggTilKnapp =
        !erLesevisning && vilkårResultater.every(vilkårResultat => vilkårResultat.resultat !== Resultat.IKKE_VURDERT);

    const skalViseFjernUtvidetBarnetrygdKnapp =
        !erLesevisning &&
        behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
        person.type === PersonType.SØKER &&
        vilkårFraConfig.key === VilkårType.UTVIDET_BARNETRYGD &&
        vilkårResultater.some(vilkårResultat => vilkårResultat.vilkårType === VilkårType.UTVIDET_BARNETRYGD);

    const skalViseLyspære =
        behandling.steg === BehandlingSteg.VILKÅRSVURDERING &&
        vilkårResultater.some(vilkårResultat => !!vilkårResultat.begrunnelseForManuellKontroll);

    return (
        <section id={generiskVilkårKey} className={classNames(styles.kort, statusklasse[vilkårstatus])}>
            <Heading size="small" level="3" className={styles.kortTittel}>
                <button
                    type="button"
                    className={styles.kortHeader}
                    aria-expanded={erÅpen}
                    onClick={() => settErÅpen(forrige => !forrige)}
                >
                    <HStack as="span" gap="space-8" align="center" wrap={false}>
                        {skalViseLyspære && (
                            <LightBulbFillIcon aria-hidden fontSize="1.25rem" color="var(--ax-warning-500)" />
                        )}
                        {vilkårFraConfig.tittel}
                    </HStack>
                    {erÅpen ? (
                        <ChevronDownIcon aria-hidden fontSize="1.5rem" />
                    ) : (
                        <ChevronUpIcon aria-hidden fontSize="1.5rem" />
                    )}
                </button>
            </Heading>
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <Box padding="space-16" paddingBlock="space-8 space-16">
                    <Fieldset error={opprettVilkårResultatError?.message} legend={vilkårFraConfig.tittel} hideLegend>
                        <VilkårTabell
                            person={person}
                            vilkårFraConfig={vilkårFraConfig}
                            vilkårResultater={vilkårResultater}
                            settFokusPåKnapp={settFokusPåLeggTilPeriodeKnapp}
                        />
                        {skalViseLeggTilKnapp && (
                            <Box marginBlock={'space-20 space-0'}>
                                <Button
                                    onClick={() =>
                                        opprettVilkårResultat({
                                            behandlingId: behandling.behandlingId,
                                            personIdent: person.personIdent,
                                            vilkårType: vilkårFraConfig.key,
                                        })
                                    }
                                    id={leggTilPeriodeKnappId}
                                    loading={opprettVilkårResultatIsPending}
                                    variant="tertiary"
                                    size="medium"
                                    icon={<PlusCircleIcon />}
                                >
                                    Legg til periode
                                </Button>
                            </Box>
                        )}
                        {skalViseFjernUtvidetBarnetrygdKnapp && (
                            <FjernUtvidetBarnetrygdVilkår personIdent={person.personIdent} />
                        )}
                    </Fieldset>
                </Box>
            </Activity>
        </section>
    );
}
