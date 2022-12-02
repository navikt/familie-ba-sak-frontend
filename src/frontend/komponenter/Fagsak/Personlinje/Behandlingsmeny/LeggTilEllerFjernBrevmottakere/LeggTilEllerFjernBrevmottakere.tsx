import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';

import NyBrevmottakerRedigerbarVisning from './NyBrevmottakerRedigerbarVisning';

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const StyledAlert = styled(Alert)`
    margin: 2rem 0;
`;

const LeggTilEllerFjernBrevmottakere: React.FC = () => {
    const [visModal, settVisModal] = useState(false);

    const lukkModal = () => {
        settVisModal(false);
    };
    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Legg til / fjern brevmottakere
            </Dropdown.Menu.List.Item>
            <StyledModal
                open={visModal}
                aria-label="Legg til eller fjern brevmottakere"
                onClose={lukkModal}
                shouldCloseOnOverlayClick={false}
            >
                <Modal.Content>
                    <Heading spacing level="2" size="medium" id="modal-heading">
                        Legg til eller fjern brevmottakere
                    </Heading>
                    <StyledAlert variant="info">
                        Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken
                        kanal. Legg til mottaker dersom brev skal sendes til utenlandsk adresse,
                        fullmektig, verge eller dødsbo.
                    </StyledAlert>
                    {/* TODO: Lag ny komponent for leservisning og legg inn sjekk for hvilken som skal vises */}
                    <NyBrevmottakerRedigerbarVisning lukkModal={lukkModal} />
                </Modal.Content>
            </StyledModal>
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
