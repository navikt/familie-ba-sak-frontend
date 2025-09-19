import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading, Table } from '@navikt/ds-react';

import KompetanseTabellRad from './KompetanseTabellRad';
import type { IBehandling } from '../../../../../../../typer/behandling';
import { BehandlingÅrsak } from '../../../../../../../typer/behandling';
import type { IRestKompetanse } from '../../../../../../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../../../../../../typer/eøsPerioder';

const KompetanseContainer = styled.div`
    margin-top: 5rem;
`;

const StyledTable = styled(Table)`
    margin-top: 2rem;
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
    &:nth-of-type(2) {
        width: 11rem;
    }
    &:nth-of-type(3) {
        width: 14rem;
    }
    &:nth-of-type(4) {
        width: 2.25rem;
    }
`;

interface IProps {
    kompetanser: IRestKompetanse[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const KompetanseSkjema: React.FC<IProps> = ({ kompetanser, åpenBehandling, visFeilmeldinger }) => {
    const harUfullstendigeKompetanser =
        åpenBehandling.kompetanser?.filter(kompetanse => kompetanse.status !== EøsPeriodeStatus.OK).length > 0;

    return (
        <KompetanseContainer>
            <Heading spacing size="medium" level="3">
                Kompetanse
            </Heading>
            {harUfullstendigeKompetanser && åpenBehandling.årsak !== BehandlingÅrsak.MIGRERING && (
                <Alert
                    variant={'warning'}
                    fullWidth
                    children={'For EØS-perioder med tilkjent ytelse, må det fastsettes kompetanse'}
                />
            )}
            {harUfullstendigeKompetanser && åpenBehandling.årsak === BehandlingÅrsak.MIGRERING && (
                <Alert
                    variant={'info'}
                    fullWidth
                    children={
                        'Saken er migrert og kompetansen er hentet fra Infotrygd. Kompetanseskjemaet er derfor ikke fullstendig utfylt.'
                    }
                />
            )}
            <StyledTable>
                <Table.Header>
                    <Table.Row>
                        <StyledHeaderCell scope="col">Barn</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Periode</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Kompetanse</StyledHeaderCell>
                        <StyledHeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {kompetanser.map(kompetanse => (
                        <KompetanseTabellRad
                            key={`${kompetanse.barnIdenter.map(barn => `${barn}-`)}-${
                                kompetanse.fom
                            }-${kompetanse.tom}`}
                            kompetanse={kompetanse}
                            åpenBehandling={åpenBehandling}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </Table.Body>
            </StyledTable>
        </KompetanseContainer>
    );
};

export default KompetanseSkjema;
