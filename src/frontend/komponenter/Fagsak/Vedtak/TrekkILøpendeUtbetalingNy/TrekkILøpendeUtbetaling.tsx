import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';

import type { IRestFeilutbetaltValuta } from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import NyFeilutbetaltValutaPeriode from './NyFeilutbetaltValutaPeriode';
import TrekkILøpendeUtbetalingListeElement from './TrekkILøpendeUtbetalingListeElement';

interface ITrekkILøpendeUtbetaling {
    behandlingId: number;
    trekkILøpendeUtbetalingListe: IRestFeilutbetaltValuta[];
    settErUlagretNyTrekkILøpendeUtbetaling: (erUlagretNyTrekkILøpendeUtbetaling: boolean) => void;
    erLesevisning: boolean;
    skjulTrekkILøpendeUtbetaling: () => void;
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
    erLesevisning,
    skjulTrekkILøpendeUtbetaling,
    behandlingId,
}) => {
    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        !trekkILøpendeUtbetalingListe
    );

    useEffect(() => {
        settErUlagretNyTrekkILøpendeUtbetaling(ønskerÅLeggeTilNyPeriode);
    }, [ønskerÅLeggeTilNyPeriode]);

    if (trekkILøpendeUtbetalingListe.length === 0 && !ønskerÅLeggeTilNyPeriode) {
        skjulTrekkILøpendeUtbetaling();
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
                        trekkILøpendeUtbetalingListe.map(trekkILøpendeUtbetaling => (
                            <TrekkILøpendeUtbetalingListeElement
                                key={trekkILøpendeUtbetaling.id}
                                behandlingId={behandlingId}
                                trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                                erLesevisning={erLesevisning}
                            />
                        ))}
                    {ønskerÅLeggeTilNyPeriode && (
                        <NyFeilutbetaltValutaPeriode
                            lukkNyPeriode={() => settØnskerÅLeggeTilNyPeriode(false)}
                            behandlingId={behandlingId}
                        />
                    )}
                </Table.Body>
            </Table>
            <FlexRowDiv>
                {!ønskerÅLeggeTilNyPeriode && !erLesevisning && (
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
