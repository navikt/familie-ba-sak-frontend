import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { BodyShort, Table, VStack } from '@navikt/ds-react';

import EndretUtbetalingAndelSkjemaRHF from './EndretUtbetalingAndelSkjemaRHF';
import { useEndretUtbetalingAndelRHF } from './useEndretUtbetalingAndelRHF';
import StatusIkon, { Status } from '../../../../../../ikoner/StatusIkon';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../../../../../../typer/utbetalingAndel';
import { årsakTekst } from '../../../../../../typer/utbetalingAndel';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { lagPersonLabel } from '../../../../../../utils/formatter';

interface EndretUtbetalingAndelRadProps {
    lagretEndretUtbetalingAndel: IRestEndretUtbetalingAndel;
    åpenBehandling: IBehandling;
}

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

const EndretUtbetalingAndelRadRHF = ({
    lagretEndretUtbetalingAndel,
    åpenBehandling,
}: EndretUtbetalingAndelRadProps) => {
    const [erSkjemaEkspandert, settErSkjemaEkspandert] = useState<boolean>(
        lagretEndretUtbetalingAndel.personIdenter.length === 0
    );

    const lukkSkjema = () => settErSkjemaEkspandert(false);

    const { form, onSubmit, slettEndretUtbetalingAndel, skjemaHarEndringerSomIkkeErLagret } =
        useEndretUtbetalingAndelRHF(lagretEndretUtbetalingAndel, åpenBehandling, lukkSkjema);

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
            content={
                <EndretUtbetalingAndelSkjemaRHF
                    form={form}
                    åpenBehandling={åpenBehandling}
                    onSubmit={onSubmit}
                    lukkSkjema={lukkSkjema}
                    slettEndretUtbetalingAndel={slettEndretUtbetalingAndel}
                />
            }
        >
            <Table.DataCell>
                <PersonCelle>
                    <StatusIkon
                        status={lagretEndretUtbetalingAndel.erTilknyttetAndeler ? Status.OK : Status.ADVARSEL}
                    />
                    {lagretEndretUtbetalingAndel.personIdenter.length > 0 ? (
                        <VStack>
                            {lagretEndretUtbetalingAndel.personIdenter.map(person => (
                                <BodyShort size="small" key={person}>
                                    {lagPersonLabel(person, åpenBehandling.personer)}
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
                    {lagretEndretUtbetalingAndel.årsak ? årsakTekst[lagretEndretUtbetalingAndel.årsak] : ''}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size={'small'}>
                    {typeof lagretEndretUtbetalingAndel.prosent === 'number'
                        ? utbetalingsprosentTilTekst(lagretEndretUtbetalingAndel.prosent)
                        : ''}
                </BodyShort>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default EndretUtbetalingAndelRadRHF;
