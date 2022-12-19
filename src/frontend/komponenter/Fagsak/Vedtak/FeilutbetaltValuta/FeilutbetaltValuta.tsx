import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, Heading, Table } from '@navikt/ds-react';

import type { IRestFeilutbetaltValuta } from '../../../../typer/eøs-feilutbetalt-valuta';
import FeilutbetaltValutaListeElement from './FeilutbetaltValutaPeriode';
import NyFeilutbetaltValutaPeriode from './NyFeilutbetaltValutaPeriode';

interface IFeilutbetaltValuta {
    behandlingId: number;
    feilutbetaltValutaListe: IRestFeilutbetaltValuta[];
    settErUlagretNyFeilutbetaltValuta: (erUlagretNyFeilutbetaltValuta: boolean) => void;
    erLesevisning: boolean;
    skjulFeilutbetaltValuta: () => void;
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

const FeilutbetaltValuta: React.FC<IFeilutbetaltValuta> = ({
    feilutbetaltValutaListe,
    settErUlagretNyFeilutbetaltValuta,
    erLesevisning,
    skjulFeilutbetaltValuta,
    behandlingId,
}) => {
    const [ønskerÅLeggeTilNyPeriode, settØnskerÅLeggeTilNyPeriode] = useState(
        !feilutbetaltValutaListe
    );

    useEffect(() => {
        settErUlagretNyFeilutbetaltValuta(ønskerÅLeggeTilNyPeriode);
    }, [ønskerÅLeggeTilNyPeriode]);

    if (feilutbetaltValutaListe.length === 0 && !ønskerÅLeggeTilNyPeriode) {
        skjulFeilutbetaltValuta();
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
                    {feilutbetaltValutaListe &&
                        feilutbetaltValutaListe.map(feilutbetaltValuta => (
                            <FeilutbetaltValutaListeElement
                                key={feilutbetaltValuta.id}
                                behandlingId={behandlingId}
                                feilutbetaltValuta={feilutbetaltValuta}
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

export default FeilutbetaltValuta;
