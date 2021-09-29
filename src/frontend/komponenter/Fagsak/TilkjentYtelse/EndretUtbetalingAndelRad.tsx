import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';

import { Collapse, Expand } from '@navikt/ds-icons';

import { IBehandling } from '../../../typer/behandling';
import {
    IEndretUtbetalingAndelÅrsak,
    IRestEndretUtbetalingAndel,
    årsakTekst,
} from '../../../typer/utbetalingAndel';
import { formaterIdent } from '../../../utils/formatter';
import { yearMonthPeriodeToString } from '../../../utils/kalender';
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

    const fraProsentTilTekst = (prosent: number, årsak?: IEndretUtbetalingAndelÅrsak): string => {
        switch (årsak) {
            case IEndretUtbetalingAndelÅrsak.DELT_BOSTED:
                return fraProsentTilTekstDeltBosted(prosent);
            default:
                throw new Error(`Ukjent årsak ${årsak}`);
        }
    };

    const fraProsentTilTekstDeltBosted = (prosent: number): string => {
        switch (prosent) {
            case 100:
                return 'Ja - Full utbetaling';
            case 50:
                return 'Ja - Delt utbetaling';
            case 0:
                return 'Nei';
            default:
                throw new Error(`Ikke støttet prosent ${prosent} for delt bosted.`);
        }
    };

    return (
        <>
            <tr>
                <td>
                    {formaterIdent(
                        endretUtbetalingAndel.personIdent ? endretUtbetalingAndel.personIdent : ''
                    )}
                </td>
                <td>
                    {endretUtbetalingAndel.fom
                        ? yearMonthPeriodeToString({
                              fom: endretUtbetalingAndel.fom,
                              tom: endretUtbetalingAndel.tom,
                          })
                        : ''}
                </td>
                <td>
                    {typeof endretUtbetalingAndel.prosent === 'number' &&
                    endretUtbetalingAndel.årsak
                        ? fraProsentTilTekst(
                              endretUtbetalingAndel.prosent,
                              endretUtbetalingAndel.årsak
                          )
                        : ''}
                </td>
                <td>
                    {endretUtbetalingAndel.årsak ? årsakTekst[endretUtbetalingAndel.årsak] : ''}
                </td>
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
