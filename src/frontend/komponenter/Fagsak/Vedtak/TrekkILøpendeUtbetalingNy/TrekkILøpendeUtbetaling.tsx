import React, { useState } from 'react';

import styled from 'styled-components';

import { AddCircle, Copy } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';

import type { IBehandling } from '../../../../typer/behandling';
import TrekkILøpendeUtbetalingListeElement from './TrekkILøpendeUtbetalingListeElement';

interface ITrekkILøpendeUtbetaling {
    skalViseTrekkILøpendeUtbetaling: boolean;
    åpenBehandling: IBehandling;
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
    skalViseTrekkILøpendeUtbetaling,
    åpenBehandling,
}) => {
    const trekkILøpendeUtbetalingListe = åpenBehandling.trekkILøpendeUtbetaling;

    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(false);

    if (skalViseTrekkILøpendeUtbetaling) {
        return (
            <FlexColumnDiv>
                <Heading level="2" size="small" spacing>
                    Trekk i løpende utbetaling
                </Heading>
                {trekkILøpendeUtbetalingListe && (
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
                            {trekkILøpendeUtbetalingListe.map((trekkILøpendeUtbetaling, indeks) => (
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
                                            behandlingId: åpenBehandling.behandlingId,
                                        },
                                        periode: {},
                                        feilutbetaltBeløp: 0,
                                    }}
                                    erNyPeriode={true}
                                    settErNyPeriode={settØnskerÅLeggeTilNyPeriode}
                                />
                            )}
                        </Table.Body>
                    </Table>
                )}
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
    }

    return <></>;
};

export default TrekkILøpendeUtbetaling;
