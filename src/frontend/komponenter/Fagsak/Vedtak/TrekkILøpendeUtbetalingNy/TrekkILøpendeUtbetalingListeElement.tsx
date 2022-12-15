import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Table, Button, Tooltip, Alert } from '@navikt/ds-react';

import type { IRestTrekkILøpendeUtbetaling } from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import { periodeToString } from '../../../../utils/kalender';
import FeilutbetaltValutaSkjema from './FeilutbetaltValutaSkjema';
import { useTrekkILøpendeUtbetaling } from './useTrekkILøpendeUtbetaling';

interface ITrekkILøpendeUtbetaling {
    trekkILøpendeUtbetaling: IRestTrekkILøpendeUtbetaling;
    erLeservisning: boolean;
    behandlingId: number;
}

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
`;

const FlexRowDiv = styled.div`
    display: flex;
`;

const TrekkILøpendeUtbetalingListeElement: React.FC<ITrekkILøpendeUtbetaling> = ({
    trekkILøpendeUtbetaling,
    erLeservisning,
    behandlingId,
}) => {
    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const { skjema, oppdaterEksisterendePeriode, nullstillSkjema, fjernPeriode, valideringErOk } =
        useTrekkILøpendeUtbetaling({
            behandlingId: behandlingId,
            trekkILøpendeUtbetaling: trekkILøpendeUtbetaling,
            settFeilmelding: settFeilmelding,
        });

    useEffect(() => {
        nullstillSkjema();
    }, [trekkILøpendeUtbetaling]);

    const avbryt = () => {
        nullstillSkjema();
        settErRadEkspandert(false);
    };

    const håndterLukkingOgÅpningAvPanel = () => {
        if (erLeservisning) return;

        if (erRadEkspandert) {
            avbryt();
        } else {
            settErRadEkspandert(true);
        }
    };

    return (
        <Table.ExpandableRow
            open={erLeservisning ? false : erRadEkspandert}
            onOpenChange={håndterLukkingOgÅpningAvPanel}
            content={
                <FlexColumnDiv>
                    <FeilutbetaltValutaSkjema skjema={skjema} />
                    <FlexRowDiv style={{ gap: '1rem' }}>
                        <Button
                            size="small"
                            onClick={oppdaterEksisterendePeriode}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                        >
                            Lagre periode
                        </Button>
                        <Button size="small" variant="tertiary" onClick={avbryt}>
                            Avbryt
                        </Button>
                    </FlexRowDiv>
                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                </FlexColumnDiv>
            }
        >
            <Table.DataCell scope="row">
                {periodeToString({
                    fom: trekkILøpendeUtbetaling.fom,
                    tom: trekkILøpendeUtbetaling.tom,
                })}
            </Table.DataCell>
            <Table.DataCell align="right">
                {trekkILøpendeUtbetaling.feilutbetaltBeløp} kr
            </Table.DataCell>
            <Table.DataCell align="center">
                <Tooltip content="Fjern periode">
                    <Button
                        icon={<Delete />}
                        variant="tertiary"
                        size="small"
                        onClick={fjernPeriode}
                        disabled={erLeservisning}
                    />
                </Tooltip>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default TrekkILøpendeUtbetalingListeElement;
