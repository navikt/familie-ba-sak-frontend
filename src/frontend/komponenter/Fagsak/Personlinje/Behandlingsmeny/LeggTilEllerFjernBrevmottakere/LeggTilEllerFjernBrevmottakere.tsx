import React, { useState } from 'react';

import { Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';

const LeggTilEllerFjernBrevmottakere: React.FC = () => {
    const [visModal, settVisModal] = useState(false);
    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Legg til / fjern brevmottakere
            </Dropdown.Menu.List.Item>
            <Modal
                open={visModal}
                aria-label="Legg til eller fjern brevmottakere"
                onClose={() => settVisModal(false)}
            >
                <Modal.Content>
                    <Heading spacing level="1" size="medium" id="modal-heading">
                        Legg til eller fjern brevmottakere
                    </Heading>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
