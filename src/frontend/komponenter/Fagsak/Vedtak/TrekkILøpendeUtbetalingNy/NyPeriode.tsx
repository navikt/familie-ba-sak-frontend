import React, { useState } from 'react';

import styled from 'styled-components';

import { Table, Button, Alert } from '@navikt/ds-react';

import FeilutbetaltValutaSkjema from './FeilutbetaltValutaSkjema';
import { useTrekkILøpendeUtbetaling } from './useTrekkILøpendeUtbetaling';

interface ITrekkILøpendeUtbetaling {
    settErNyPeriode: (erNyPeriode: boolean) => void;
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

const TrekkILøpendeUtbetalingNyPeriode: React.FC<ITrekkILøpendeUtbetaling> = ({
    settErNyPeriode,
    behandlingId,
}) => {
    const [feilmelding, settFeilmelding] = useState<string>();

    const { skjema, lagreNyPeriode, nullstillSkjema, valideringErOk } = useTrekkILøpendeUtbetaling({
        behandlingId: behandlingId,
        settFeilmelding: settFeilmelding,
    });

    const avbrytLeggTilNy = () => {
        nullstillSkjema();
        settErNyPeriode(false);
    };

    const lagre = () => {
        lagreNyPeriode();
        settErNyPeriode(false);
    };

    return (
        <Table.ExpandableRow
            open={true}
            content={
                <FlexColumnDiv>
                    <FeilutbetaltValutaSkjema skjema={skjema} />
                    <FlexRowDiv style={{ gap: '1rem' }}>
                        <Button
                            size="small"
                            onClick={lagre}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                        >
                            Lagre periode
                        </Button>
                        <Button size="small" variant="tertiary" onClick={avbrytLeggTilNy}>
                            Avbryt
                        </Button>
                    </FlexRowDiv>
                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                </FlexColumnDiv>
            }
        ></Table.ExpandableRow>
    );
};

export default TrekkILøpendeUtbetalingNyPeriode;
