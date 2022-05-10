import 'nav-frontend-tabell-style';

import * as React from 'react';

import styled from 'styled-components';

import { Heading, Table } from '@navikt/ds-react';

import { EndretUtbetalingAndelProvider } from '../../../context/EndretUtbetalingAndelContext';
import type { IBehandling } from '../../../typer/behandling';
import EndretUtbetalingAndelRad from './EndretUtbetalingAndelRad';

interface IEndretUtbetalingAndelTabellProps {
    åpenBehandling: IBehandling;
}

const EndredePerioder = styled.div`
    margin-top: 6rem;
`;

const EndretUtbetalingAndelTabell: React.FunctionComponent<IEndretUtbetalingAndelTabellProps> = ({
    åpenBehandling,
}) => {
    const endretUtbetalingAndeler = åpenBehandling.endretUtbetalingAndeler;

    return (
        <EndredePerioder>
            <Heading spacing size="medium" level="3">
                Endrede utbetalingsperioder
            </Heading>
            <Table className="tabell">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Person</Table.HeaderCell>
                        <Table.HeaderCell>Periode</Table.HeaderCell>
                        <Table.HeaderCell>Årsak</Table.HeaderCell>
                        <Table.HeaderCell>Utbetales</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {endretUtbetalingAndeler.map(endretUtbetalingAndel => (
                        <EndretUtbetalingAndelProvider
                            endretUtbetalingAndel={endretUtbetalingAndel}
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
        </EndredePerioder>
    );
};

export default EndretUtbetalingAndelTabell;
