import React from 'react';

import styled from 'styled-components';

import { Button, Select, TextField } from '@navikt/ds-react';

const StyledSkjema = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
`;

const StyledInputKontainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const NyBrevmottakerSkjema: React.FC = () => {
    return (
        <StyledSkjema>
            <Select label="Mottaker">
                {/* TODO: Legg inn riktige valgmuligheter */}
                <option value="">Eksempel</option>
            </Select>

            <StyledInputKontainer>
                {/* TODO: Legg inn alle felter. Kun et felt lagt inn for testing. */}
                <TextField label="Navn" />
            </StyledInputKontainer>
            <Knapperad>
                <Button variant="secondary" size="medium">
                    Legg til mottaker
                </Button>
                <Button variant="tertiary" size="medium">
                    Avbryt
                </Button>
            </Knapperad>
        </StyledSkjema>
    );
};

export default NyBrevmottakerSkjema;
