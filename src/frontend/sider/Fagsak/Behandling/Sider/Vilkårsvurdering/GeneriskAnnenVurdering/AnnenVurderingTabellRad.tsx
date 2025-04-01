import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Table } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import AnnenVurderingRadEndre from './AnnenVurderingRadEndre';
import { annenVurderingFeilmeldingId } from './AnnenVurderingTabell';
import { useBehandlingContext } from '../../../../../../context/behandlingContext/BehandlingContext';
import VilkårResultatIkon from '../../../../../../ikoner/VilkårResultatIkon';
import type { IGrunnlagPerson } from '../../../../../../typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../../../typer/vilkår';
import { Resultat, resultatVisningsnavn } from '../../../../../../typer/vilkår';

interface IProps {
    person: IGrunnlagPerson;
    annenVurderingConfig: IAnnenVurderingConfig;
    annenVurdering: FeltState<IAnnenVurdering>;
    visFeilmeldinger: boolean;
}

const BeskrivelseCelle = styled(BodyShort)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const VurderingCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    > div:nth-child(n + 2) {
        padding-left: 0.5rem;
    }
`;

const StyledPersonIcon = styled(PersonIcon)`
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const AnnenVurderingTabellRad: React.FC<IProps> = ({
    person,
    annenVurderingConfig,
    visFeilmeldinger,
    annenVurdering,
}) => {
    const { vurderErLesevisning } = useBehandlingContext();

    const [ekspandertAnnenVurdering, settEkspandertAnnenVurdering] = useState(
        vurderErLesevisning() || annenVurdering.verdi.resultat.verdi === Resultat.IKKE_VURDERT
    );
    const [redigerbartAnnenVurdering, settRedigerbartAnnenVurdering] =
        useState<FeltState<IAnnenVurdering>>(annenVurdering);

    const toggleForm = (visAlert: boolean) => {
        if (
            ekspandertAnnenVurdering &&
            visAlert &&
            !deepEqual(annenVurdering, redigerbartAnnenVurdering)
        ) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertAnnenVurdering(!ekspandertAnnenVurdering);
            settRedigerbartAnnenVurdering(annenVurdering);
        }
    };

    return (
        <Table.ExpandableRow
            open={ekspandertAnnenVurdering}
            togglePlacement="right"
            onOpenChange={() => toggleForm(true)}
            id={annenVurderingFeilmeldingId(annenVurdering.verdi)}
            content={
                <AnnenVurderingRadEndre
                    person={person}
                    annenVurderingConfig={annenVurderingConfig}
                    annenVurdering={annenVurdering}
                    visFeilmeldinger={visFeilmeldinger}
                    toggleForm={toggleForm}
                    redigerbartAnnenVurdering={redigerbartAnnenVurdering}
                    settRedigerbartAnnenVurdering={settRedigerbartAnnenVurdering}
                    settEkspandertAnnenVurdering={settEkspandertAnnenVurdering}
                />
            }
        >
            <Table.DataCell>
                <VurderingCelle>
                    <VilkårResultatIkon resultat={annenVurdering.verdi.resultat.verdi} />
                    <BodyShort
                        children={resultatVisningsnavn[annenVurdering.verdi.resultat.verdi]}
                    />
                </VurderingCelle>
            </Table.DataCell>
            <Table.DataCell>
                <BeskrivelseCelle children={annenVurdering.verdi.begrunnelse.verdi} />
            </Table.DataCell>
            <Table.DataCell>
                <FlexDiv>
                    <StyledPersonIcon title={'Manuell vurdering'} />
                    <div>
                        {annenVurdering.verdi.erVurdert ? 'Vurdert i denne behandlingen' : ''}
                    </div>
                </FlexDiv>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default AnnenVurderingTabellRad;
