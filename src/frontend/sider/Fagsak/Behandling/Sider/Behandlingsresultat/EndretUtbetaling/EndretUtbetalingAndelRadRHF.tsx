import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { BodyShort, Table, VStack } from '@navikt/ds-react';

import { useEndretUtbetalingAndelContext } from './EndretUtbetalingAndelContext';
import EndretUtbetalingAndelSkjemaRHF from './EndretUtbetalingAndelSkjemaRHF';
import { useEndretUtbetalingAndelRHF } from './useEndretUtbetalingAndelRHF';
import StatusIkon, { Status } from '../../../../../../ikoner/StatusIkon';
import { årsakTekst } from '../../../../../../typer/utbetalingAndel';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { lagPersonLabel } from '../../../../../../utils/formatter';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const PersonCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const utbetalingsprosentTilTekst = (prosent: number): string => {
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

const EndretUtbetalingAndelRadRHF = () => {
    const { behandling } = useBehandlingContext();
    const { endretUtbetalingAndel } = useEndretUtbetalingAndelContext();
    const [erSkjemaEkspandert, settErSkjemaEkspandert] = useState<boolean>(
        endretUtbetalingAndel.personIdenter.length === 0
    );

    const lukkSkjema = () => settErSkjemaEkspandert(false);

    const { form, onSubmit, skjemaHarEndringerSomIkkeErLagret } = useEndretUtbetalingAndelRHF(
        endretUtbetalingAndel,
        lukkSkjema
    );

    const { reset } = form;

    const toggleForm = () => {
        if (erSkjemaEkspandert && skjemaHarEndringerSomIkkeErLagret()) {
            alert('Endret utbetalingsandelen har endringer som ikke er lagret!');
            return;
        }
        if (erSkjemaEkspandert) reset();
        settErSkjemaEkspandert(!erSkjemaEkspandert);
    };

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            open={erSkjemaEkspandert}
            onOpenChange={toggleForm}
            content={<EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={onSubmit} lukkSkjema={lukkSkjema} />}
        >
            <Table.DataCell>
                <PersonCelle>
                    <StatusIkon status={endretUtbetalingAndel.erTilknyttetAndeler ? Status.OK : Status.ADVARSEL} />
                    {endretUtbetalingAndel.personIdenter.length > 0 ? (
                        <VStack>
                            {endretUtbetalingAndel.personIdenter.map(person => (
                                <BodyShort size="small" key={person}>
                                    {lagPersonLabel(person, behandling.personer)}
                                </BodyShort>
                            ))}
                        </VStack>
                    ) : (
                        <BodyShort size="small">Ikke satt</BodyShort>
                    )}
                </PersonCelle>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {endretUtbetalingAndel.fom
                        ? isoMånedPeriodeTilFormatertString({
                              periode: {
                                  fom: endretUtbetalingAndel.fom,
                                  tom: endretUtbetalingAndel.tom,
                              },
                              tilFormat: Datoformat.MÅNED_ÅR,
                          })
                        : ''}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {endretUtbetalingAndel.årsak ? årsakTekst[endretUtbetalingAndel.årsak] : ''}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {typeof endretUtbetalingAndel.prosent === 'number'
                        ? utbetalingsprosentTilTekst(endretUtbetalingAndel.prosent)
                        : ''}
                </BodyShort>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default EndretUtbetalingAndelRadRHF;
