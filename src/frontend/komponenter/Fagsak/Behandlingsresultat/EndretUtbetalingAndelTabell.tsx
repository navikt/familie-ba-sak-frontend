import 'nav-frontend-tabell-style';

import * as React from 'react';

import styled from 'styled-components';

import { Heading } from '@navikt/ds-react';

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
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Periode</th>
                        <th>Årsak</th>
                        <th>Utbetales</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </EndredePerioder>
    );
};

export default EndretUtbetalingAndelTabell;
