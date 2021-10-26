import * as React from 'react';
import { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';

import { Collapse, Expand } from '@navikt/ds-icons';

import { useEndretUtbetalingAndel } from '../../../context/EndretUtbetalingAndelContext';
import Advarsel from '../../../ikoner/Advarsel';
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
    settFeilmelding: (feilmelding: string) => void;
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
    settFeilmelding,
}) => {
    const [åpenUtbetalingsAndel, settÅpenUtbetalingsAndel] = useState<boolean>(
        endretUtbetalingAndel.personIdent === null
    );

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
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    <PersonCelle>
                        {!endretUtbetalingAndel.erTilknyttetAndeler && (
                            <Advarsel
                                heigth={20}
                                width={20}
                                title={
                                    'Du har endrede utbetalingsperioder. Bekreft, slett eller oppdater periodene i listen.'
                                }
                            />
                        )}
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
                    {typeof endretUtbetalingAndel.prosent === 'number' &&
                    endretUtbetalingAndel.årsak
                        ? fraProsentTilTekst(
                              endretUtbetalingAndel.prosent,
                              endretUtbetalingAndel.årsak
                          )
                        : ''}
                </TdUtenUnderstrek>
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    {endretUtbetalingAndel.årsak ? årsakTekst[endretUtbetalingAndel.årsak] : ''}
                </TdUtenUnderstrek>
                <TdUtenUnderstrek erÅpen={åpenUtbetalingsAndel}>
                    <Flatknapp mini onClick={() => toggleForm()}>
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
                            settFeilmelding={settFeilmelding}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default EndretUtbetalingAndelRad;
