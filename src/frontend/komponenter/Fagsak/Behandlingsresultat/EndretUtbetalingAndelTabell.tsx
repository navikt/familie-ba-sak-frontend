import * as React from 'react';

import styled from 'styled-components';

import { Heading, Table } from '@navikt/ds-react';

import EndretUtbetalingAndelRad from './EndretUtbetalingAndelRad';
import { EndretUtbetalingAndelProvider } from '../../../context/EndretUtbetalingAndelContext';
import type { IBehandling } from '../../../typer/behandling';

interface IEndretUtbetalingAndelTabellProps {
    åpenBehandling: IBehandling;
}

const EndredePerioderContainer = styled.div`
    margin-top: 6rem;
`;

const EndretUtbetalingAndelTabell: React.FunctionComponent<IEndretUtbetalingAndelTabellProps> = ({
    åpenBehandling,
}) => {
    const endretUtbetalingAndeler = åpenBehandling.endretUtbetalingAndeler;

    return (
        <EndredePerioderContainer>
            <Heading spacing size="medium" level="3">
                Endrede utbetalingsperioder
            </Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Person</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Årsak</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Utbetales</Table.HeaderCell>
                        <Table.HeaderCell scope="col" />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {endretUtbetalingAndeler.map(endretUtbetalingAndel => (
                        <EndretUtbetalingAndelProvider
                            endretUtbetalingAndel={endretUtbetalingAndel}
                            åpenBehandling={åpenBehandling}
                            key={endretUtbetalingAndel.id}
                        >
                            <EndretUtbetalingAndelRad
                                endretUtbetalingAndel={endretUtbetalingAndel}
                                åpenBehandling={åpenBehandling}
                            />
                        </EndretUtbetalingAndelProvider>
                    ))}
                </Table.Body>
            </Table>
        </EndredePerioderContainer>
    );
};

export default EndretUtbetalingAndelTabell;
