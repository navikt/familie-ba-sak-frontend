import 'nav-frontend-tabell-style';

import * as React from 'react';

import styled from 'styled-components';

import { Element } from 'nav-frontend-typografi';

import { EndretUtbetalingAndelProvider } from '../../../context/EndretUtbetalingAndelContext';
import { IBehandling } from '../../../typer/behandling';
import EndretUtbetalingAndelRad from './EndretUtbetalingAndelRad';

interface IEndretUtbetalingAndelTabellProps {
    åpenBehandling: IBehandling;
}

const EndredePerioder = styled.div`
    margin-top: 6rem;
`;

const Overskrift = styled(Element)`
    margin-bottom: 1rem;
`;

const EndretUtbetalingAndelTabell: React.FunctionComponent<IEndretUtbetalingAndelTabellProps> = ({
    åpenBehandling,
}) => {
    const endretUtbetalingAndeler = åpenBehandling.endretUtbetalingAndeler;

    return (
        <EndredePerioder>
            <Overskrift>Endrede perioder</Overskrift>
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Periode</th>
                        <th>Utbetales</th>
                        <th>Årsak</th>
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
