import * as React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { Heading } from '@navikt/ds-react';
import { FeltState } from '@navikt/familie-skjema';

import { IKompetanse } from '../../../../typer/kompetanse';
import KompetanseTabellRad from './KompetanseTabellRad';

const KompetanseContainer = styled.div`
    margin-top: 5rem;
`;

const Tabell = styled.table`
    margin-top: 2rem;
    table-layout: fixed;
    min-width: 64rem;
    td:first-child .checkboks + .skjemaelement__label {
        text-indent: 2rem;
        width: 13rem;
    }
`;

export const kompetanseFeilmeldingId = (kompetanse: FeltState<IKompetanse>): string =>
    `vilkår_${kompetanse.verdi.barn.verdi.map(barn => `${barn}-`)}_${kompetanse.verdi.fom.verdi}`;

interface IProps {
    kompetanser: FeltState<IKompetanse>[];
    visFeilmeldinger: boolean;
}

const KompetanseSkjema: React.FC<IProps> = ({ kompetanser, visFeilmeldinger }) => {
    return (
        <KompetanseContainer>
            <Heading size="medium" level="3">
                Kompetanse
            </Heading>
            <AlertStripe
                type="advarsel"
                children={'For EØS-perioder med tilkjent ytelse, må det fastsettes kompetanse'}
            />
            <Tabell className={`tabell`}>
                <thead>
                    <tr>
                        <th>Barn</th>
                        <th>Periode</th>
                        <th>Kompetanse</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {kompetanser.map(kompetanse => (
                        <KompetanseTabellRad
                            key={`${kompetanse.verdi?.barn.verdi.map(barn => `${barn}-`)}-${
                                kompetanse.verdi?.fom.verdi
                            }-${kompetanse.verdi?.tom.verdi}`}
                            kompetanse={kompetanse}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </tbody>
            </Tabell>
        </KompetanseContainer>
    );
};

export default KompetanseSkjema;
