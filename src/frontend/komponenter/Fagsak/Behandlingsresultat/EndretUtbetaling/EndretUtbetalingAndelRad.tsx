import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { BodyShort, Table } from '@navikt/ds-react';

import EndretUtbetalingAndelSkjema from './EndretUtbetalingAndelSkjema';
import { useEndretUtbetalingAndel } from './useEndretUtbetalingAndel';
import StatusIkon, { Status } from '../../../../ikoner/StatusIkon';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../../../../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak, årsakTekst } from '../../../../typer/utbetalingAndel';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../utils/dato';
import { lagPersonLabel } from '../../../../utils/formatter';

interface IEndretUtbetalingAndelRadProps {
    lagretEndretUtbetalingAndel: IRestEndretUtbetalingAndel;
    åpenBehandling: IBehandling;
}

const PersonCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const EndretUtbetalingAndelRad: React.FunctionComponent<IEndretUtbetalingAndelRadProps> = ({
    lagretEndretUtbetalingAndel,
    åpenBehandling,
}) => {
    const [erSkjemaEkspandert, settErSkjemaEkspandert] = useState<boolean>(
        lagretEndretUtbetalingAndel.personIdent === null
    );

    const {
        skjema,
        skjemaHarEndringerSomIkkeErLagret,
        settFelterTilLagredeVerdier,
        oppdaterEndretUtbetaling,
        slettEndretUtbetaling,
    } = useEndretUtbetalingAndel(lagretEndretUtbetalingAndel, åpenBehandling);

    const toggleForm = () => {
        if (skjemaHarEndringerSomIkkeErLagret() && erSkjemaEkspandert) {
            alert('Endretutbetalingsandelen har endringer som ikke er lagret!');
        } else {
            settErSkjemaEkspandert(!erSkjemaEkspandert);
        }
    };

    const fraProsentTilTekst = (prosent: number, årsak?: IEndretUtbetalingAndelÅrsak): string => {
        switch (årsak) {
            case IEndretUtbetalingAndelÅrsak.DELT_BOSTED:
            case IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER:
            case IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT:
            case IEndretUtbetalingAndelÅrsak.ETTERBETALING_3ÅR:
            case IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND:
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
        <Table.ExpandableRow
            togglePlacement="right"
            open={erSkjemaEkspandert}
            onOpenChange={() => toggleForm()}
            content={
                <EndretUtbetalingAndelSkjema
                    skjema={skjema}
                    åpenBehandling={åpenBehandling}
                    lukkSkjema={() => {
                        settErSkjemaEkspandert(false);
                    }}
                    slettEndretUtbetaling={slettEndretUtbetaling}
                    oppdaterEndretUtbetaling={oppdaterEndretUtbetaling}
                    settFelterTilLagredeVerdier={settFelterTilLagredeVerdier}
                />
            }
        >
            <Table.DataCell>
                <PersonCelle>
                    <StatusIkon
                        status={
                            lagretEndretUtbetalingAndel.erTilknyttetAndeler
                                ? Status.OK
                                : Status.ADVARSEL
                        }
                    />
                    <BodyShort size={'small'}>
                        {lagretEndretUtbetalingAndel.personIdent
                            ? lagPersonLabel(
                                  lagretEndretUtbetalingAndel.personIdent,
                                  åpenBehandling.personer
                              )
                            : 'Ikke satt'}
                    </BodyShort>
                </PersonCelle>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {lagretEndretUtbetalingAndel.fom
                        ? isoMånedPeriodeTilFormatertString({
                              periode: {
                                  fom: lagretEndretUtbetalingAndel.fom,
                                  tom: lagretEndretUtbetalingAndel.tom,
                              },
                              tilFormat: Datoformat.MÅNED_ÅR,
                          })
                        : ''}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {lagretEndretUtbetalingAndel.årsak
                        ? årsakTekst[lagretEndretUtbetalingAndel.årsak]
                        : ''}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {typeof lagretEndretUtbetalingAndel.prosent === 'number' &&
                    lagretEndretUtbetalingAndel.årsak
                        ? fraProsentTilTekst(
                              lagretEndretUtbetalingAndel.prosent,
                              lagretEndretUtbetalingAndel.årsak
                          )
                        : ''}
                </BodyShort>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default EndretUtbetalingAndelRad;
