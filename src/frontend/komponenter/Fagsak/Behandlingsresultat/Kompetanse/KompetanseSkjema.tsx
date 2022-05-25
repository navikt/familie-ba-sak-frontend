import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../typer/behandling';
import type { IKompetanse } from '../../../../typer/eøsPerioder';
import { KompetanseStatus } from '../../../../typer/eøsPerioder';
import KompetanseTabellRad from './KompetanseTabellRad';

const KompetanseContainer = styled.div`
    margin-top: 5rem;
`;

const Tabell = styled.table`
    margin-top: 2rem;
    table-layout: fixed;

    & fieldset.skjemagruppe {
        margin-bottom: 1.5rem;
    }

    & div.skjemaelement {
        margin-bottom: 1.5rem;
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
    `kompetanse_${kompetanse.verdi.barnIdenter.verdi.map(barn => `${barn}-`)}_${
        kompetanse.verdi.periode.verdi.fom
    }`;

export const kompetansePeriodeFeilmeldingId = (kompetanse: FeltState<IKompetanse>): string =>
    `kompetanse-periode_${kompetanse.verdi.barnIdenter.verdi.map(barn => `${barn}-`)}_${
        kompetanse.verdi.periode.verdi.fom
    }`;

interface IProps {
    kompetanser: FeltState<IKompetanse>[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const KompetanseSkjema: React.FC<IProps> = ({ kompetanser, åpenBehandling, visFeilmeldinger }) => {
    const harUfullstendigeKompetanser =
        åpenBehandling.kompetanser?.filter(kompetanse => kompetanse.status !== KompetanseStatus.OK)
            .length > 0;

    return (
        <KompetanseContainer>
            <Heading spacing size="medium" level="3">
                Kompetanse
            </Heading>
            {harUfullstendigeKompetanser && (
                <Alert
                    variant={'warning'}
                    fullWidth
                    children={'For EØS-perioder med tilkjent ytelse, må det fastsettes kompetanse'}
                />
            )}
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
                            key={`${kompetanse.verdi?.barnIdenter.verdi.map(barn => `${barn}-`)}-${
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
