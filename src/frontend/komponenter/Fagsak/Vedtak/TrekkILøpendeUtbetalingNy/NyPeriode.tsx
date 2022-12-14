import React, { useState } from 'react';

import styled from 'styled-components';

import { Table, Button, Alert } from '@navikt/ds-react';

import PeriodeSkjema from './PeriodeSkjema';
import { useTrekkILøpendeUtbetaling } from './useTrekkILøpendeUtbetaling';

interface ITrekkILøpendeUtbetaling {
    settErNyPeriode: (erNyPeriode: boolean) => void;
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
}) => {
    const [feilmelding, settFeilmelding] = useState<string>();

    const { skjema, lagreNyPeriode, nullstillSkjema, valideringErOk } = useTrekkILøpendeUtbetaling({
        trekkILøpendeUtbetaling: {
            identifikator: {
                id: 0,
                behandlingId: 0,
            },
            periode: {},
        },
        // settErNyPeriode: settErNyPeriode,
        settFeilmelding: settFeilmelding,
    });

    const avbrytLeggTilNy = () => {
        nullstillSkjema();
        settErNyPeriode(false);
    };

    return (
        <Table.ExpandableRow
            open={true}
            content={
                <FlexColumnDiv>
                    <PeriodeSkjema skjema={skjema} />
                    <FlexRowDiv style={{ gap: '1rem' }}>
                        <Button
                            size="small"
                            onClick={lagreNyPeriode}
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
