import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';

import { Collapse, Expand } from '@navikt/ds-icons';

import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
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
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    settFeilmelding: (feilmelding: string) => void;
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
    settVisFeilmeldinger,
    settFeilmelding,
}) => {
    const [åpenUtbetalingsAndel, settÅpenUtbetalingsAndel] = useState<boolean>(
        endretUtbetalingAndel.personIdent === null
    );

    const { skjema } = useEndretUtbetalingAndel();

    const toggleForm = (visAlert: boolean) => {
        if (
            (endretUtbetalingAndel.årsak !== skjema.felter.årsak.verdi ||
                endretUtbetalingAndel.fom !== skjema.felter.fom.verdi ||
                endretUtbetalingAndel.tom !== skjema.felter.tom.verdi ||
                endretUtbetalingAndel.personIdent !== skjema.felter.person.verdi ||
                endretUtbetalingAndel.prosent !==
                    (skjema.felter.periodeSkalUtbetalesTilSøker.verdi ? 100 : 0) /
                        (skjema.felter.fullSats.verdi ? 1 : 2) ||
                endretUtbetalingAndel.begrunnelse !== skjema.felter.begrunnelse.verdi) &&
            visAlert &&
            åpenUtbetalingsAndel
        ) {
            alert('Endretutbetalingsandelen har endringer som ikke er lagret!');
        } else {
            settÅpenUtbetalingsAndel(!åpenUtbetalingsAndel);
        }
    };

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
                    <Flatknapp mini onClick={() => toggleForm(true)}>
                        {åpenUtbetalingsAndel ? (
                            <>
                                <StyledCollapseIkon /> Lukk
                            </>
                        ) : (
                            <>
                                <StyledExpandIkon /> Endre
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
                            avbrytEndringAvUtbetalingsperiode={() => {
                                settÅpenUtbetalingsAndel(false);
                            }}
                            settVisFeilmeldinger={settVisFeilmeldinger}
                            settFeilmelding={settFeilmelding}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default EndretUtbetalingAndelRad;
