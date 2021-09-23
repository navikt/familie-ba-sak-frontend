import * as React from 'react';

import 'nav-frontend-tabell-style';

import { useState } from 'react';

import styled from 'styled-components';

import { IBehandling } from '../../../typer/behandling';
import { Flatknapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';

import { Expand, Edit } from '@navikt/ds-icons';
import { Collapse } from '@navikt/ds-icons';

interface IEndretUtbetalingAndelTabellProps {
    åpenBehandling: IBehandling;
}

const EndredePerioder = styled.div`
    margin-top: 6rem;
`;

const Overskrift = styled(Element)`
    margin-bottom: 1rem;
`;

const StyledExpandIkon = styled(Expand)`
    margin-right: 0.5rem;
`;

const StyledCollapseIkon = styled(Collapse)`
    margin-right: 0.5rem;
`;

const EndretUtbetalingAndelTabell: React.FunctionComponent<IEndretUtbetalingAndelTabellProps> = ({
    åpenBehandling,
}) => {
    const [åpenUtbetalingsAndel, settÅpenUtbetalingsAndel] = useState<undefined | string>();
    //const endretUtbetalingAndeler = åpenBehandling.endretUtbetalingAndeler;

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
                    {
                        /*endretUtbetalingAndeler*/ [].map((endredUtbetalingAndel: any) => (
                            <>
                                <tr
                                    onClick={() =>
                                        settÅpenUtbetalingsAndel(endredUtbetalingAndel.id)
                                    }
                                >
                                    <td>{endredUtbetalingAndel.personIdent}</td>
                                    <td>
                                        {endredUtbetalingAndel.fom} - {endredUtbetalingAndel.tom}
                                    </td>
                                    <td>{endredUtbetalingAndel.prosent}%</td>
                                    <td>{endredUtbetalingAndel.årsak}</td>
                                    <td>
                                        {åpenUtbetalingsAndel === endredUtbetalingAndel.id ? (
                                            <Flatknapp
                                                mini
                                                onClick={() =>
                                                    settÅpenUtbetalingsAndel(
                                                        endredUtbetalingAndel.id
                                                    )
                                                }
                                            >
                                                <StyledCollapseIkon /> Lukk
                                            </Flatknapp>
                                        ) : (
                                            <Flatknapp
                                                mini
                                                onClick={() => settÅpenUtbetalingsAndel(undefined)}
                                            >
                                                <StyledExpandIkon /> Lukk
                                            </Flatknapp>
                                        )}
                                    </td>
                                </tr>
                                {åpenUtbetalingsAndel === endredUtbetalingAndel.id && (
                                    <></>
                                    /*<EndretUtbetalingAndelSkjema
                                    avbrytEndringAvUtbetalingsperiode={() =>
                                        settÅpenUtbetalingsAndel(undefined)
                                    }
                                    åpenBehandling={åpenBehandling}
                                />*/
                                )}
                            </>
                        ))
                    }
                </tbody>
            </table>
        </EndredePerioder>
    );
};

export default EndretUtbetalingAndelTabell;
