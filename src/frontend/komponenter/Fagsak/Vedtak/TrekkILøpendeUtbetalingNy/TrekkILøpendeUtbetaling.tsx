import React, { useState } from 'react';

import styled from 'styled-components';

import { AddCircle, Copy } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';

import type { IRestTrekkILøpendeUtbetaling } from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import TrekkILøpendeUtbetalingListeElement from './TrekkILøpendeUtbetalingListeElement';

interface ITrekkILøpendeUtbetaling {
    behandlingId: number;
    trekkILøpendeUtbetalingListe?: IRestTrekkILøpendeUtbetaling[];
}

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3.5rem;
    margin-top: 2rem;
`;

const FlexRowDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TrekkILøpendeUtbetaling: React.FC<ITrekkILøpendeUtbetaling> = ({
    trekkILøpendeUtbetalingListe,
    behandlingId,
}) => {
    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        !trekkILøpendeUtbetalingListe
    );

    return (
        <FlexColumnDiv>
            <Heading level="2" size="small" spacing>
                Trekk i løpende utbetaling
            </Heading>
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell align="right" scope="col">
                            Refusjonsbeløp
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {trekkILøpendeUtbetalingListe &&
                        trekkILøpendeUtbetalingListe.map((trekkILøpendeUtbetaling, indeks) => (
                            <TrekkILøpendeUtbetalingListeElement
                                key={indeks}
                                trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                                settErNyPeriode={settØnskerÅLeggeTilNyPeriode}
                                erNyPeriode={false}
                            />
                        ))}
                    {ønskerÅLeggeTilNyPeriode && (
                        <TrekkILøpendeUtbetalingListeElement
                            trekkILøpendeUtbetaling={{
                                identifikator: {
                                    id: 0,
                                    behandlingId: behandlingId,
                                },
                                periode: {},
                            }}
                            erNyPeriode={true}
                            settErNyPeriode={settØnskerÅLeggeTilNyPeriode}
                        />
                    )}
                </Table.Body>
            </Table>
            <FlexRowDiv>
                <Button
                    variant="tertiary"
                    size="small"
                    icon={<AddCircle />}
                    onClick={() => settØnskerÅLeggeTilNyPeriode(true)}
                >
                    Legg til ny periode
                </Button>
                <Button variant="tertiary" size="small" icon={<Copy />}>
                    Kopier tekst til NØS
                </Button>
            </FlexRowDiv>
        </FlexColumnDiv>
    );
};

export default TrekkILøpendeUtbetaling;
