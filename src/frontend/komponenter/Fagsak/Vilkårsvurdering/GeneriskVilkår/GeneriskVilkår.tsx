import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading } from '@navikt/ds-react';
import { NavdsSpacing5, NavdsSpacing8, NavdsSpacing16 } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IGrunnlagPerson } from '../../../../typer/person';
import { PersonType } from '../../../../typer/person';
import type { IVilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
import { Resultat, VilkårType } from '../../../../typer/vilkår';
import FjernUtvidetBarnetrygdVilkår from './FjernUtvidetBarnetrygdVilkår';
import VilkårTabell from './VilkårTabell';

interface IProps {
    person: IGrunnlagPerson;
    vilkårResultater: FeltState<IVilkårResultat>[];
    vilkårFraConfig: IVilkårConfig;
    visFeilmeldinger: boolean;
    generiskVilkårKey: string;
}

const Container = styled.div`
    margin-top: ${NavdsSpacing16};
    &:last-child {
        margin-bottom: ${NavdsSpacing8};
    }
`;

const UtførKnapp = styled(Button)`
    margin-top: ${NavdsSpacing5};
`;

const GeneriskVilkår: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultater,
    visFeilmeldinger,
    generiskVilkårKey,
}) => {
    const { erLesevisning, settÅpenBehandling, erMigreringsbehandling } = useBehandling();
    const { settVilkårSubmit, postVilkår, vilkårSubmit } = useVilkårsvurdering();

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
        if (erLesevisning()) {
            return false;
        }
        const uvurdertPeriodePåVilkår = vilkårResultater.find(
            vilkår => vilkår.verdi.resultat.verdi === Resultat.IKKE_VURDERT
        );
        return uvurdertPeriodePåVilkår === undefined;
    };

    const skalViseFjernUtvidetBarnetrygdKnapp = () => {
        if (erLesevisning()) {
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

    return (
        <Container>
            <SkjemaGruppe feil={visFeilmeldingerForVilkår ? feilmelding : undefined}>
                <Heading size="medium" level="3">
                    {vilkårFraConfig.tittel}
                </Heading>
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
                        size="small"
                    >
                        <AddCircle />
                        Legg til periode
                    </UtførKnapp>
                )}
                {skalViseFjernUtvidetBarnetrygdKnapp() && (
                    <FjernUtvidetBarnetrygdVilkår
                        personIdent={person.personIdent}
                        slettVilkårId={generiskVilkårKey + '__slett-vilkår-utvidet'}
                    />
                )}
            </SkjemaGruppe>
        </Container>
    );
};

export default GeneriskVilkår;
