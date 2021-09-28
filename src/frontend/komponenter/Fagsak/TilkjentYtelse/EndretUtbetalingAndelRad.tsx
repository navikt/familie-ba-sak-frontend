import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';

import { Collapse, Expand } from '@navikt/ds-icons';

import { IBehandling } from '../../../typer/behandling';
import { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import EndretUtbetalingAndelSkjema from './EndretUtbetalingAndelSkjema';

interface IEndretUtbetalingAndelRadProps {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
    åpenBehandling: IBehandling;
}

const StyledCollapseIkon = styled(Collapse)`
    margin-right: 0.5rem;
`;

const StyledExpandIkon = styled(Expand)`
    margin-right: 0.5rem;
`;

const EndretUtbetalingAndelRad: React.FunctionComponent<IEndretUtbetalingAndelRadProps> = ({
    endretUtbetalingAndel,
    åpenBehandling,
}) => {
    const [åpenUtbetalingsAndel, settÅpenUtbetalingsAndel] = useState<boolean>(false);

    return (
        <>
            <tr>
                <td>{endretUtbetalingAndel.personIdent}</td>
                <td>
                    {endretUtbetalingAndel.fom} - {endretUtbetalingAndel.tom}
                </td>
                <td>{endretUtbetalingAndel.prosent ? `${endretUtbetalingAndel.prosent}%` : ''}</td>
                <td>{endretUtbetalingAndel.årsak}</td>
                <td>
                    <Flatknapp mini onClick={() => settÅpenUtbetalingsAndel(!åpenUtbetalingsAndel)}>
                        {åpenUtbetalingsAndel ? (
                            <>
                                <StyledCollapseIkon /> Lukk
                            </>
                        ) : (
                            <>
                                <StyledExpandIkon /> Åpne
                            </>
                        )}
                    </Flatknapp>
                </td>
            </tr>
            {åpenUtbetalingsAndel && (
                <tr>
                    <td colSpan={5}>
                        <EndretUtbetalingAndelSkjema
                            åpenBehandling={åpenBehandling}
                            avbrytEndringAvUtbetalingsperiode={() =>
                                settÅpenUtbetalingsAndel(false)
                            }
                            endretUtbetalingAndel={endretUtbetalingAndel}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default EndretUtbetalingAndelRad;
