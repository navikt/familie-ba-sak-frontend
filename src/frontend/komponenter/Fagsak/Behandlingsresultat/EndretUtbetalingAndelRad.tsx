import * as React from 'react';
import { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';

import { Collapse, Expand } from '@navikt/ds-icons';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
import type { IBehandling } from '../../../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak, årsakTekst } from '../../../typer/utbetalingAndel';
import { formaterIdent } from '../../../utils/formatter';
import { yearMonthPeriodeToString } from '../../../utils/kalender';
import StatusIkon, { Status } from '../../Felleskomponenter/StatusIkon';
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

const TdUtenUnderstrek = styled.td<{ erÅpen: boolean }>`
    ${props => props.erÅpen && 'border-bottom: 0 !important;'}
`;

const PersonCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const EndretUtbetalingAndelRad: React.FunctionComponent<IEndretUtbetalingAndelRadProps> = ({
    endretUtbetalingAndel,
    åpenBehandling,
}) => {
    const [åpenUtbetalingsAndel, settÅpenUtbetalingsAndel] = useState<boolean>(
        endretUtbetalingAndel.personIdent === null
    );

    const { erLesevisning } = useBehandling();

    const { hentSkjemaData } = useEndretUtbetalingAndel();

    const erSkjemaForandret = () =>
        !deepEqual(
            {
                ...endretUtbetalingAndel,
                prosent:
                    typeof endretUtbetalingAndel.prosent === 'number'
                        ? endretUtbetalingAndel.prosent
                        : 0,
            },
            hentSkjemaData()
        );

    const toggleForm = () => {
        if (erSkjemaForandret() && åpenUtbetalingsAndel) {
            alert('Endretutbetalingsandelen har endringer som ikke er lagret!');
        } else {
            settÅpenUtbetalingsAndel(!åpenUtbetalingsAndel);
        }
    };

    const fraProsentTilTekst = (prosent: number, årsak?: IEndretUtbetalingAndelÅrsak): string => {
        switch (årsak) {
            case IEndretUtbetalingAndelÅrsak.DELT_BOSTED:
            case IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER:
            case IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT:
            case IEndretUtbetalingAndelÅrsak.ETTERBETALING_3ÅR:
                return fraProsentTilTekstDefault(prosent);
            default:
                throw new Error(`Ukjent årsak ${årsak}`);
        }
    };

    const fraProsentTilTekstDefault = (prosent: number): string => {
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
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    <PersonCelle>
                        <StatusIkon
                            status={
                                endretUtbetalingAndel.erTilknyttetAndeler
                                    ? Status.OK
                                    : Status.ADVARSEL
                            }
                            heigth={20}
                            width={20}
                        />
                        {formaterIdent(
                            endretUtbetalingAndel.personIdent
                                ? endretUtbetalingAndel.personIdent
                                : '',
                            'Ikke satt'
                        )}
                    </PersonCelle>
                </TdUtenUnderstrek>
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    {endretUtbetalingAndel.fom
                        ? yearMonthPeriodeToString({
                              fom: endretUtbetalingAndel.fom,
                              tom: endretUtbetalingAndel.tom,
                          })
                        : ''}
                </TdUtenUnderstrek>
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    {endretUtbetalingAndel.årsak ? årsakTekst[endretUtbetalingAndel.årsak] : ''}
                </TdUtenUnderstrek>
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    {typeof endretUtbetalingAndel.prosent === 'number' &&
                    endretUtbetalingAndel.årsak
                        ? fraProsentTilTekst(
                              endretUtbetalingAndel.prosent,
                              endretUtbetalingAndel.årsak
                          )
                        : ''}
                </TdUtenUnderstrek>
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    <Flatknapp mini onClick={() => toggleForm()}>
                        {åpenUtbetalingsAndel ? (
                            <>
                                Lukk <StyledCollapseIkon />
                            </>
                        ) : (
                            <>
                                {erLesevisning() ? 'Se mer' : 'Endre'} <StyledExpandIkon />
                            </>
                        )}
                    </Flatknapp>
                </TdUtenUnderstrek>
            </tr>
            {åpenUtbetalingsAndel && (
                <tr>
                    <td colSpan={5}>
                        <EndretUtbetalingAndelSkjema
                            åpenBehandling={åpenBehandling}
                            avbrytEndringAvUtbetalingsperiode={() => {
                                settÅpenUtbetalingsAndel(false);
                            }}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default EndretUtbetalingAndelRad;
