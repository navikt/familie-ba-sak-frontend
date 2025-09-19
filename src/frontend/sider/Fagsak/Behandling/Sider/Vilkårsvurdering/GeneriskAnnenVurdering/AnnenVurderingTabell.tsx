import React from 'react';

import styled from 'styled-components';

import { Table } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import AnnenVurderingTabellRad from './AnnenVurderingTabellRad';
import type { IGrunnlagPerson } from '../../../../../../typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../../../typer/vilkår';

export const annenVurderingFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingResultatFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-resultat_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingBegrunnelseFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-begrunnelse_${annenVurdering.type}_${annenVurdering.id}`;

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

const TabellHeader = styled(Table.HeaderCell)`
    &:nth-of-type(1) {
        width: 21rem;
    }
    &:nth-of-type(2) {
        width: 20rem;
    }
    &:nth-of-type(3) {
        width: 15rem;
    }
    &:nth-of-type(4) {
        width: 2.25rem;
    }
`;

const AnnenVurderingTabell: React.FC<IProps> = ({
    person,
    annenVurderingConfig,
    andreVurderinger,
    visFeilmeldinger,
}) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <TabellHeader>Vurdering</TabellHeader>
                    <TabellHeader>Begrunnelse</TabellHeader>
                    <TabellHeader>Vurdert av</TabellHeader>
                    <TabellHeader />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {andreVurderinger.map((annenVurdering: FeltState<IAnnenVurdering>, index: number) => {
                    return (
                        <AnnenVurderingTabellRad
                            key={`${index}_${person.fødselsdato}_${annenVurdering.verdi.type}`}
                            annenVurderingConfig={annenVurderingConfig}
                            person={person}
                            annenVurdering={annenVurdering}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default AnnenVurderingTabell;
