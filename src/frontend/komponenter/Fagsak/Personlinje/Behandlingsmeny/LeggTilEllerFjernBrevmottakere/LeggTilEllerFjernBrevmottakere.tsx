import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';

import NyBrevmottakerSkjema from './NyBrevmottakerSkjema';

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const LeggTilEllerFjernBrevmottakere: React.FC = () => {
    const [visModal, settVisModal] = useState(false);
    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Legg til / fjern brevmottakere
            </Dropdown.Menu.List.Item>
            <StyledModal
                open={visModal}
                aria-label="Legg til eller fjern brevmottakere"
                onClose={() => settVisModal(false)}
            >
                <Modal.Content>
                    <Heading spacing level="2" size="medium" id="modal-heading">
                        Legg til eller fjern brevmottakere
                    </Heading>
                    <Alert variant="info">
                        Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken
                        kanal. Legg til mottaker dersom brev skal sendes til utenlandsk adresse,
                        fullmektig, verge eller dødsbo.
                    </Alert>
                    {/* TODO: Lag ny komponent for leservisning og legg inn sjekk for hvilken som skal vises */}
                    <NyBrevmottakerSkjema />
                </Modal.Content>
            </StyledModal>
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
