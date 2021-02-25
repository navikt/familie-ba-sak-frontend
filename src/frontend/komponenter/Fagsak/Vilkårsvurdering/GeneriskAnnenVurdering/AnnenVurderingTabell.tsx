import React from 'react';

import styled from 'styled-components';

import { FeltState } from '@navikt/familie-skjema';

import { IGrunnlagPerson } from '../../../../typer/person';
import { IAnnenVurdering, IVilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
import AnnenVurderingTabellRad from '../GeneriskAnnenVurdering/AnnenVurderingTabellRad';

export const annenVurderingFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `vilkår_${annenVurdering.type}_${annenVurdering.id}`;

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårPeriodeFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-periode_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    vilkårFraConfig: IVilkårConfig;
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
    vilkårFraConfig,
    andreVurderinger,
    visFeilmeldinger,
}) => {
    return (
        <Tabell className={'tabell'}>
            <thead>
                <tr>
                    <TabellHeader>Vurdering</TabellHeader>
                    <TabellHeader>Periode</TabellHeader>
                    <TabellHeader>Begrunnelse</TabellHeader>
                    <TabellHeader />
                    <TabellHeader />
                    <TabellHeader />
                </tr>
            </thead>
            {andreVurderinger.map((anneVurdering: FeltState<IAnnenVurdering>) => {
                return (
                    <AnnenVurderingTabellRad
                        key={`${person.personIdent}_${anneVurdering.verdi.type}_${anneVurdering.verdi.id}`}
                        vilkårFraConfig={vilkårFraConfig}
                        person={person}
                        annenVurdering={anneVurdering}
                        visFeilmeldinger={visFeilmeldinger}
                    />
                );
            })}
        </Tabell>
    );
};

export default AnnenVurderingTabell;
