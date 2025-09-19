import React, { useState } from 'react';

import styled from 'styled-components';

import { Table, Button, Alert } from '@navikt/ds-react';

import RefusjonEøsSkjema from './RefusjonEøsSkjema';
import { useRefusjonEøs } from './useRefusjonEøs';

interface INyRefusjonEøsPeriodeProps {
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

const NyRefusjonEøsPeriode: React.FC<INyRefusjonEøsPeriodeProps> = ({ lukkNyPeriode, behandlingId }) => {
    const [feilmelding, settFeilmelding] = useState<string>();

    const { skjema, lagreNyPeriode, valideringErOk } = useRefusjonEøs({
        behandlingId,
        settFeilmelding: settFeilmelding,
    });

    const avbrytLeggTilNy = () => {
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
                    <RefusjonEøsSkjema skjema={skjema} />
                    <FlexRowDiv style={{ gap: '1rem' }}>
                        <Button size="small" onClick={lagre} variant={valideringErOk() ? 'primary' : 'secondary'}>
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

export default NyRefusjonEøsPeriode;
