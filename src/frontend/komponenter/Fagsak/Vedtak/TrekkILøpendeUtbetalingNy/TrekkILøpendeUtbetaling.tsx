import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';

import type { IRestTrekkILøpendeUtbetaling } from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import NyFeilutbetaltValutaPeriode from './NyFeilutbetaltValutaPeriode';
import TrekkILøpendeUtbetalingListeElement from './TrekkILøpendeUtbetalingListeElement';

interface ITrekkILøpendeUtbetaling {
    behandlingId: number;
    trekkILøpendeUtbetalingListe: IRestTrekkILøpendeUtbetaling[];
    settErUlagretNyTrekkILøpendeUtbetaling: (erUlagretNyTrekkILøpendeUtbetaling: boolean) => void;
    erLeservisning: boolean;
    settVisTrekkILøpendeUtbetaling: (visTrekkILøpendeUtbetaling: boolean) => void;
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
    settErUlagretNyTrekkILøpendeUtbetaling,
    erLeservisning,
    settVisTrekkILøpendeUtbetaling,
    behandlingId,
}) => {
    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        !trekkILøpendeUtbetalingListe
    );

    useEffect(() => {
        settErUlagretNyTrekkILøpendeUtbetaling(ønskerÅLeggeTilNyPeriode);
    }, [ønskerÅLeggeTilNyPeriode]);

    if (trekkILøpendeUtbetalingListe.length === 0 && !ønskerÅLeggeTilNyPeriode) {
        settVisTrekkILøpendeUtbetaling(false);
    }

    return (
        <FlexColumnDiv>
            <Heading level="2" size="small" spacing>
                Feilutbetalt valuta
            </Heading>
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell align="right" scope="col">
                            Feilutbetalt beløp
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {trekkILøpendeUtbetalingListe &&
                        trekkILøpendeUtbetalingListe.map((trekkILøpendeUtbetaling, indeks) => (
                            <TrekkILøpendeUtbetalingListeElement
                                key={indeks}
                                behandlingId={behandlingId}
                                trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                                erLeservisning={erLeservisning}
                            />
                        ))}
                    {ønskerÅLeggeTilNyPeriode && (
                        <NyFeilutbetaltValutaPeriode
                            settErNyPeriode={settØnskerÅLeggeTilNyPeriode}
                            behandlingId={behandlingId}
                        />
                    )}
                </Table.Body>
            </Table>
            <FlexRowDiv>
                {!ønskerÅLeggeTilNyPeriode && !erLeservisning && (
                    <Button
                        variant="tertiary"
                        size="small"
                        icon={<AddCircle />}
                        onClick={() => settØnskerÅLeggeTilNyPeriode(true)}
                    >
                        Legg til ny periode
                    </Button>
                )}
            </FlexRowDiv>
        </FlexColumnDiv>
    );
};

export default TrekkILøpendeUtbetaling;
