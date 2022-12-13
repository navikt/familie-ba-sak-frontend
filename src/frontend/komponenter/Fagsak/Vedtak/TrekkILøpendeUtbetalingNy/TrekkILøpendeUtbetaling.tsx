import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle, Copy } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';

import type { IRestTrekkILøpendeUtbetaling } from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import TrekkILøpendeUtbetalingListeElement from './TrekkILøpendeUtbetalingListeElement';

interface ITrekkILøpendeUtbetaling {
    behandlingId: number;
    trekkILøpendeUtbetalingListe?: IRestTrekkILøpendeUtbetaling[];
    settErUlagretNyTrekkILøpendeUtbetaling: (erUlagretNyTrekkILøpendeUtbetaling: boolean) => void;
    erLeservisning: boolean;
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
    settErUlagretNyTrekkILøpendeUtbetaling: settErUlagretEndringTrekkILøpendeUtbetaling,
    erLeservisning,
}) => {
    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        !trekkILøpendeUtbetalingListe
    );

    useEffect(() => {
        settErUlagretEndringTrekkILøpendeUtbetaling(ønskerÅLeggeTilNyPeriode);
    }, [ønskerÅLeggeTilNyPeriode]);

    if (!trekkILøpendeUtbetalingListe && !ønskerÅLeggeTilNyPeriode) {
        return <></>;
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
                                trekkILøpendeUtbetaling={trekkILøpendeUtbetaling}
                                settErNyPeriode={settØnskerÅLeggeTilNyPeriode}
                                erNyPeriode={false}
                                erLeservisning={erLeservisning}
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
                            erLeservisning={erLeservisning}
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
                {/* TODO: Legg inn "Kopier til NØS-knapp" her */}
            </FlexRowDiv>
        </FlexColumnDiv>
    );
};

export default TrekkILøpendeUtbetaling;
