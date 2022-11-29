import React from 'react';

import styled from 'styled-components';

import { Button, Select, TextField } from '@navikt/ds-react';

import { ModalKnapperad } from '../../../../Felleskomponenter/Modal/ModalKnapperad';

interface IProps {
    lukkModal: () => void;
}

const StyledInputKontainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const NyBrevmottakerRedigerbarVisning: React.FC<IProps> = ({ lukkModal }) => {
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
            <ModalKnapperad>
                <Button variant="secondary" size="medium">
                    Legg til mottaker
                </Button>
                <Button variant="tertiary" size="medium" onClick={lukkModal}>
                    Avbryt
                </Button>
            </ModalKnapperad>
        </>
    );
};

export default NyBrevmottakerRedigerbarVisning;
