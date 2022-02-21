import * as React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { Heading } from '@navikt/ds-react';
import { FeltState } from '@navikt/familie-skjema';

import { IBehandling } from '../../../../typer/behandling';
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

const TabellHeader = styled.th`
    &:nth-of-type(2) {
        width: 11rem;
    }
    &:nth-of-type(3) {
        width: 9rem;
    }
    &:nth-of-type(4) {
        width: 14rem;
    }
`;

export const kompetanseFeilmeldingId = (kompetanse: FeltState<IKompetanse>): string =>
    `kompetanse_${kompetanse.verdi.barn.verdi.map(barn => `${barn}-`)}_${
        kompetanse.verdi.periode.verdi.fom
    }`;

export const kompetansePeriodeFeilmeldingId = (kompetanse: FeltState<IKompetanse>): string =>
    `kompetanse-periode_${kompetanse.verdi.barn.verdi.map(barn => `${barn}-`)}_${
        kompetanse.verdi.periode.verdi.fom
    }`;

interface IProps {
    kompetanser: FeltState<IKompetanse>[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const KompetanseSkjema: React.FC<IProps> = ({ kompetanser, åpenBehandling, visFeilmeldinger }) => {
    return (
        <KompetanseContainer>
            <Heading spacing size="medium" level="3">
                Kompetanse
            </Heading>
            <AlertStripe
                type="advarsel"
                children={'For EØS-perioder med tilkjent ytelse, må det fastsettes kompetanse'}
            />
            <Tabell className={`tabell`}>
                <thead>
                    <tr>
                        <TabellHeader>Barn</TabellHeader>
                        <TabellHeader>Periode</TabellHeader>
                        <TabellHeader>Kompetanse</TabellHeader>
                        <TabellHeader></TabellHeader>
                    </tr>
                </thead>
                <tbody>
                    {kompetanser.map(kompetanse => (
                        <KompetanseTabellRad
                            key={`${kompetanse.verdi?.barn.verdi.map(barn => `${barn}-`)}-${
                                kompetanse.verdi.periode.verdi.fom
                            }-${kompetanse.verdi.periode.verdi.tom}`}
                            kompetanse={kompetanse}
                            åpenBehandling={åpenBehandling}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </tbody>
            </Tabell>
        </KompetanseContainer>
    );
};

export default KompetanseSkjema;
