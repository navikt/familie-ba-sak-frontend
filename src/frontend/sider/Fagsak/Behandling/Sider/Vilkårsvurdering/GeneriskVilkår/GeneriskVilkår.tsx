import { useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import { useEkspanderbareVilkårResultatRader } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { BehandlingSteg, Behandlingstype, type IBehandling } from '@typer/behandling';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import type { IVilkårConfig, IVilkårResultat } from '@typer/vilkår';
import { Resultat, VilkårType } from '@typer/vilkår';
import styled from 'styled-components';

import { LightBulbFillIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, Heading, HStack } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import FjernUtvidetBarnetrygdVilkår from './FjernUtvidetBarnetrygdVilkår';
import VilkårTabell from './VilkårTabell';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { useVilkårsvurderingContext, VilkårSubmit } from '../VilkårsvurderingContext';

interface IProps {
    person: IGrunnlagPerson;
    vilkårResultater: FeltState<IVilkårResultat>[];
    vilkårFraConfig: IVilkårConfig;
    visFeilmeldinger: boolean;
    generiskVilkårKey: string;
}

const Container = styled.div`
    margin-top: var(--ax-space-64);

    &:last-child {
        margin-bottom: var(--ax-space-20);
    }
`;

const GeneriskVilkår = ({ person, vilkårFraConfig, vilkårResultater, visFeilmeldinger, generiskVilkårKey }: IProps) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { settVilkårSubmit, postVilkår, vilkårSubmit } = useVilkårsvurderingContext();

    const { ekspanderRad } = useEkspanderbareVilkårResultatRader();

    const erLesevisning = useErLesevisning();

    const [visFeilmeldingerForVilkår, settVisFeilmeldingerForVilkår] = useState(false);
    const [feilmelding, settFeilmelding] = useState('');

    const leggTilPeriodeKnappId = generiskVilkårKey + '__legg_til_periode';

    const settFokusPåLeggTilPeriodeKnapp = () => {
        document.getElementById(leggTilPeriodeKnappId)?.focus();
    };

    function åpneNyeIkkeVurdertVilkårResultat(behandling: IBehandling, eksisterendeVilkårResultatIder: number[]) {
        // Dette er gjort slik siden APIet ikke returnerer IDen til det opprettede vilkår resultatet.
        const nyeIkkeVurdertVilkårResultat = behandling.personResultater
            .flatMap(it => it.vilkårResultater)
            .filter(it => it.resultat === Resultat.IKKE_VURDERT)
            .filter(it => !eksisterendeVilkårResultatIder.includes(it.id));
        nyeIkkeVurdertVilkårResultat.forEach(it => ekspanderRad(it.id));
    }

    const håndterNyPeriodeVilkårsvurdering = (promise: Promise<Ressurs<IBehandling>>) => {
        const eksisterendeVilkårResultatIder = behandling.personResultater
            .flatMap(it => it.vilkårResultater)
            .map(it => it.id);
        promise
            .then((oppdatertBehandling: Ressurs<IBehandling>) => {
                settVisFeilmeldingerForVilkår(false);
                settVilkårSubmit(VilkårSubmit.NONE);
                settFeilmelding('');
                if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(oppdatertBehandling);
                    åpneNyeIkkeVurdertVilkårResultat(oppdatertBehandling.data, eksisterendeVilkårResultatIder);
                } else if (
                    oppdatertBehandling.status === RessursStatus.FEILET ||
                    oppdatertBehandling.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertBehandling.status === RessursStatus.IKKE_TILGANG
                ) {
                    settFeilmelding(oppdatertBehandling.frontendFeilmelding);
                    settVisFeilmeldingerForVilkår(true);
                } else {
                    settFeilmelding('En ukjent feil har oppstått, vi har ikke klart å legge til periode.');
                    settVisFeilmeldingerForVilkår(true);
                }
            })
            .catch(() => {
                settVilkårSubmit(VilkårSubmit.NONE);
            });
    };

    const skalViseLeggTilKnapp = () => {
        if (erLesevisning) {
            return false;
        }
        const uvurdertPeriodePåVilkår = vilkårResultater.find(
            vilkår => vilkår.verdi.resultat.verdi === Resultat.IKKE_VURDERT
        );
        return uvurdertPeriodePåVilkår === undefined;
    };

    const skalViseFjernUtvidetBarnetrygdKnapp = () => {
        if (erLesevisning) {
            return false;
        }
        const utvidetVilkår = vilkårResultater.filter(
            vilkårResultat => vilkårResultat.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD
        );
        return (
            behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
            person.type === PersonType.SØKER &&
            vilkårFraConfig.key === VilkårType.UTVIDET_BARNETRYGD &&
            utvidetVilkår.length !== 0
        );
    };

    const skalViseLyspære =
        behandling.steg == BehandlingSteg.VILKÅRSVURDERING &&
        vilkårResultater.some(vilkår => !!vilkår.verdi.begrunnelseForManuellKontroll);

    return (
        <Container>
            <Fieldset
                error={visFeilmeldingerForVilkår ? feilmelding : undefined}
                legend={vilkårFraConfig.tittel}
                hideLegend
            >
                <HStack gap="space-16" align="center">
                    {skalViseLyspære && <LightBulbFillIcon fontSize="1.5rem" color="var(--ax-warning-500)" />}
                    <Heading size="medium" level="3">
                        {vilkårFraConfig.tittel}
                    </Heading>
                </HStack>
                <VilkårTabell
                    person={person}
                    vilkårFraConfig={vilkårFraConfig}
                    vilkårResultater={vilkårResultater}
                    visFeilmeldinger={visFeilmeldinger}
                    settFokusPåKnapp={settFokusPåLeggTilPeriodeKnapp}
                />
                {skalViseLeggTilKnapp() && (
                    <Box marginBlock={'space-20 space-0'}>
                        <Button
                            onClick={() => {
                                const promise = postVilkår(person.personIdent, vilkårFraConfig.key as VilkårType);
                                håndterNyPeriodeVilkårsvurdering(promise);
                            }}
                            id={leggTilPeriodeKnappId}
                            loading={vilkårSubmit === VilkårSubmit.POST}
                            disabled={vilkårSubmit === VilkårSubmit.POST}
                            variant="tertiary"
                            size="medium"
                            icon={<PlusCircleIcon />}
                        >
                            Legg til periode
                        </Button>
                    </Box>
                )}
                {skalViseFjernUtvidetBarnetrygdKnapp() && (
                    <FjernUtvidetBarnetrygdVilkår
                        personIdent={person.personIdent}
                        slettVilkårId={generiskVilkårKey + '__slett-vilkår-utvidet'}
                    />
                )}
            </Fieldset>
        </Container>
    );
};

export default GeneriskVilkår;
