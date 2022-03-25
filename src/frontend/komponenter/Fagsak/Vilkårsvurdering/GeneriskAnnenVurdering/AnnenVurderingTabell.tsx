import React from 'react';

import styled from 'styled-components';

import type { FeltState } from '@navikt/familie-skjema';

import type { IGrunnlagPerson } from '../../../../typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../typer/vilkår';
import AnnenVurderingTabellRad from '../GeneriskAnnenVurdering/AnnenVurderingTabellRad';

export const annenVurderingFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingResultatFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-resultat_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingBegrunnelseFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-begrunnelse_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingPeriodeFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-periode_${annenVurdering.type}_${annenVurdering.id}`;

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

const Tabell = styled.table`
    table-layout: fixed;
    td:first-child .checkboks + .skjemaelement__label {
        margin-bottom: 1rem;
        text-indent: 2rem;
        width: 13rem;
    }
`;
// Midlertidig styling. Se issue: https://github.com/navikt/nav-frontend-moduler/issues/997

const TabellHeader = styled.th`
    &:nth-of-type(1) {
        width: 10rem;
    }
    &:nth-of-type(2) {
        width: 12rem;
    }
    &:nth-of-type(4) {
        width: 7rem;
    }
    &:nth-of-type(5) {
        width: 3rem;
    }
    &:nth-of-type(6) {
        width: 15rem;
    }
`;

const AnnenVurderingTabell: React.FC<IProps> = ({
    person,
    annenVurderingConfig,
    andreVurderinger,
    visFeilmeldinger,
}) => {
    return (
        <Tabell className={'tabell'}>
            <thead>
                <tr>
                    <TabellHeader>Vurdering</TabellHeader>
                    <TabellHeader />
                    <TabellHeader>Begrunnelse</TabellHeader>
                    <TabellHeader />
                    <TabellHeader />
                    <TabellHeader />
                </tr>
            </thead>
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
        </Tabell>
    );
};

export default AnnenVurderingTabell;
