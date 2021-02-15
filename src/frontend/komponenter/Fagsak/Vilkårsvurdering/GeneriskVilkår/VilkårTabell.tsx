import React from 'react';

import styled from 'styled-components';

import { FeltState } from '@navikt/familie-skjema';

import { IGrunnlagPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
import VilkårTabellRad from './VilkårTabellRad';

export const vilkårFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårPeriodeFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-periode_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface IProps {
    person: IGrunnlagPerson;
    vilkårResultater: FeltState<IVilkårResultat>[];
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

const VilkårTabell: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultater,
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
            {vilkårResultater.map((vilkårResultat: FeltState<IVilkårResultat>) => {
                return (
                    <VilkårTabellRad
                        key={`${person.personIdent}_${vilkårResultat.verdi.vilkårType}_${vilkårResultat.verdi.id}`}
                        vilkårFraConfig={vilkårFraConfig}
                        person={person}
                        vilkårResultat={vilkårResultat}
                        visFeilmeldinger={visFeilmeldinger}
                    />
                );
            })}
        </Tabell>
    );
};

export default VilkårTabell;
