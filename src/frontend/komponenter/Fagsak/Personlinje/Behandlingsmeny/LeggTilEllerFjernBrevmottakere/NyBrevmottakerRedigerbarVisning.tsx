import React from 'react';

import styled from 'styled-components';

import { Button, Select, TextField } from '@navikt/ds-react';

const StyledInputKontainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Knapperad = styled.div`
    margin-top: 2.5rem;
    display: flex;
    justify-content: flex-start;
`;

const NyBrevmottakerRedigerbarVisning: React.FC = () => {
    return (
        <>
            <StyledInputKontainer>
                <Select label="Mottaker">
                    {/* TODO: Legg inn riktige valgmuligheter */}
                    <option value="">Eksempel</option>
                </Select>
                <TextField label="Navn" />
                {/* TODO: Legg inn alle felter. Kun et felt lagt inn for testing. */}
            </StyledInputKontainer>
            <Knapperad>
                <Button variant="secondary" size="medium">
                    Legg til mottaker
                </Button>
                <Button variant="tertiary" size="medium">
                    Avbryt
                </Button>
            </Knapperad>
        </>
    );
};

export default NyBrevmottakerRedigerbarVisning;
