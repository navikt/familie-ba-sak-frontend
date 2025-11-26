import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, Button, Table } from '@navikt/ds-react';

import FeilutbetaltValutaSkjema from './FeilutbetaltValutaSkjema';
import { useFeilutbetaltValuta } from './useFeilutbetaltValuta';

interface INyFeilutbetaltValutaPeriodeProps {
    lukkNyPeriode: () => void;
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

const NyFeilutbetaltValutaPeriode: React.FC<INyFeilutbetaltValutaPeriodeProps> = ({ lukkNyPeriode, behandlingId }) => {
    const [feilmelding, settFeilmelding] = useState<string>();

    const { skjema, lagreNyPeriode, nullstillSkjema } = useFeilutbetaltValuta({
        behandlingId: behandlingId,
        settFeilmelding: settFeilmelding,
    });

    const avbrytLeggTilNy = () => {
        nullstillSkjema();
        lukkNyPeriode();
    };

    const lagre = () => {
        lagreNyPeriode(() => lukkNyPeriode());
    };

    return (
        <Table.ExpandableRow
            open={true}
            content={
                <FlexColumnDiv>
                    <FeilutbetaltValutaSkjema skjema={skjema} />
                    <FlexRowDiv style={{ gap: '1rem' }}>
                        <Button size="small" onClick={lagre} variant={'primary'}>
                            Lagre periode
                        </Button>
                        <Button size="small" variant="tertiary" onClick={avbrytLeggTilNy}>
                            Avbryt
                        </Button>
                    </FlexRowDiv>
                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                </FlexColumnDiv>
            }
        />
    );
};

export default NyFeilutbetaltValutaPeriode;
