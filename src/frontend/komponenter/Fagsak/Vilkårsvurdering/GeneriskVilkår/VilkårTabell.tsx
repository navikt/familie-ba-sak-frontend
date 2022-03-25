import React from 'react';

import styled from 'styled-components';

import type { FeltState } from '@navikt/familie-skjema';

import { useApp } from '../../../../context/AppContext';
import type { IGrunnlagPerson } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import type { IVilkårConfig, IVilkårResultat } from '../../../../typer/vilkår';
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
    settFokusPåKnapp: () => void;
}

const Tabell = styled.table`
    table-layout: fixed;
    min-width: 64rem;
    td:first-child .checkboks + .skjemaelement__label {
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
        width: 12rem;
    }
    &:nth-of-type(5) {
        width: 17rem;
    }
    &:nth-of-type(6) {
        width: 6rem;
    }
`;

const VilkårTabell: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultater,
    visFeilmeldinger,
    settFokusPåKnapp,
}) => {
    const { toggles } = useApp();
    return (
        <Tabell className={'tabell'}>
            <thead>
                <tr>
                    <TabellHeader>Vurdering</TabellHeader>
                    <TabellHeader>Periode</TabellHeader>
                    <TabellHeader>Begrunnelse</TabellHeader>
                    <TabellHeader>
                        {toggles[ToggleNavn.brukEøs] ? 'Vurderes etter' : ''}
                    </TabellHeader>
                    <TabellHeader>Vurdert av</TabellHeader>
                    <TabellHeader />
                </tr>
            </thead>
            <tbody>
                {vilkårResultater.map(
                    (vilkårResultat: FeltState<IVilkårResultat>, index: number) => {
                        return (
                            <VilkårTabellRad
                                key={`${index}_${person.fødselsdato}_${vilkårResultat.verdi.vilkårType}_${vilkårResultat.verdi.id}`}
                                vilkårFraConfig={vilkårFraConfig}
                                person={person}
                                vilkårResultat={vilkårResultat}
                                visFeilmeldinger={visFeilmeldinger}
                                settFokusPåKnapp={settFokusPåKnapp}
                            />
                        );
                    }
                )}
            </tbody>
        </Tabell>
    );
};

export default VilkårTabell;
