import React, { useState } from 'react';

import { useNavigate } from 'react-router';

import { BodyLong, Button, Modal } from '@navikt/ds-react';

import { useHentAppVersjon } from '../../../hooks/useHentAppVersjon';

export function UtdatertAppVersjonModal() {
    const navigate = useNavigate();

    const [visModal, settVisModal] = useState(false);
    const [forrigeVersjon, settForrigeVersjon] = useState<string | undefined>(undefined);

    const { data: versjon } = useHentAppVersjon();

    if (versjon !== undefined && versjon !== forrigeVersjon) {
        if (forrigeVersjon !== undefined) {
            settVisModal(true);
        }
        settForrigeVersjon(versjon);
    }

    function refreshCurrentRoute() {
        navigate(0);
    }

    return (
        <Modal
            open={visModal}
            portal={true}
            header={{ heading: 'Løsningen er utdatert' }}
            onClose={() => settVisModal(false)}
            width={'35rem'}
        >
            <Modal.Body>
                <BodyLong>
                    Det finnes en oppdatert versjon av løsningen. Det anbefales at du oppdaterer med en gang.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'primary'} onClick={refreshCurrentRoute}>
                    Oppdater
                </Button>
                <Button variant={'tertiary'} onClick={() => settVisModal(false)}>
                    Lukk
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
