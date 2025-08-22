import React, { useState } from 'react';

import styled from 'styled-components';

import { LightBulbFillIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Heading, HStack } from '@navikt/ds-react';
import { ASpacing16, ASpacing5, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import FjernUtvidetBarnetrygdVilkår from './FjernUtvidetBarnetrygdVilkår';
import VilkårTabell from './VilkårTabell';
import { useAppContext } from '../../../../../../context/AppContext';
import { BehandlingSteg, type IBehandling } from '../../../../../../typer/behandling';
import type { IGrunnlagPerson } from '../../../../../../typer/person';
import { PersonType } from '../../../../../../typer/person';
import { ToggleNavn } from '../../../../../../typer/toggles';
import type { IVilkårConfig, IVilkårResultat } from '../../../../../../typer/vilkår';
import { Resultat, VilkårType } from '../../../../../../typer/vilkår';
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
    margin-top: ${ASpacing16};

    &:last-child {
        margin-bottom: ${ASpacing8};
    }
`;

const UtførKnapp = styled(Button)`
    margin-top: ${ASpacing5};
`;

const GeneriskVilkår: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultater,
    visFeilmeldinger,
    generiskVilkårKey,
}) => {
    const { toggles } = useAppContext();
    const { behandling, vurderErLesevisning, settÅpenBehandling, erMigreringsbehandling } =
        useBehandlingContext();
    const erLesevisning = vurderErLesevisning();
    const { settVilkårSubmit, postVilkår, vilkårSubmit } = useVilkårsvurderingContext();

    const [visFeilmeldingerForVilkår, settVisFeilmeldingerForVilkår] = useState(false);
    const [feilmelding, settFeilmelding] = useState('');

    const leggTilPeriodeKnappId = generiskVilkårKey + '__legg_til_periode';

    const settFokusPåLeggTilPeriodeKnapp = () => {
        document.getElementById(leggTilPeriodeKnappId)?.focus();
    };

    const håndterNyPeriodeVilkårsvurdering = (promise: Promise<Ressurs<IBehandling>>) => {
        promise
            .then((oppdatertBehandling: Ressurs<IBehandling>) => {
                settVisFeilmeldingerForVilkår(false);
                settVilkårSubmit(VilkårSubmit.NONE);
                settFeilmelding('');
                if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(oppdatertBehandling);
                } else if (
                    oppdatertBehandling.status === RessursStatus.FEILET ||
                    oppdatertBehandling.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertBehandling.status === RessursStatus.IKKE_TILGANG
                ) {
                    settFeilmelding(oppdatertBehandling.frontendFeilmelding);
                    settVisFeilmeldingerForVilkår(true);
                } else {
                    settFeilmelding(
                        'En ukjent feil har oppstått, vi har ikke klart å legge til periode.'
                    );
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
            erMigreringsbehandling &&
            person.type === PersonType.SØKER &&
            vilkårFraConfig.key === VilkårType.UTVIDET_BARNETRYGD &&
            utvidetVilkår.length !== 0
        );
    };

    const skalViseLyspære =
        toggles[ToggleNavn.skalViseVarsellampeForManueltLagtTilBarn] &&
        behandling.steg == BehandlingSteg.VILKÅRSVURDERING &&
        vilkårResultater.some(vilkår => !!vilkår.verdi.begrunnelseForManuellKontroll);

    return (
        <Container>
            <Fieldset
                error={visFeilmeldingerForVilkår ? feilmelding : undefined}
                legend={vilkårFraConfig.tittel}
                hideLegend
            >
                <HStack gap="4" align="center">
                    {skalViseLyspære && (
                        <LightBulbFillIcon fontSize="1.5rem" color="var(--a-icon-warning)" />
                    )}
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
                    <UtførKnapp
                        onClick={() => {
                            const promise = postVilkår(
                                person.personIdent,
                                vilkårFraConfig.key as VilkårType
                            );
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
                    </UtførKnapp>
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
