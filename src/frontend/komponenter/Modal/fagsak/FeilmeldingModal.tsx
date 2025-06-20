import React from 'react';

import { Alert, Modal } from '@navikt/ds-react';

import { ModalType } from '../../../context/ModalContext';
import { useModal } from '../../../hooks/useModal';

export function FeilmeldingModal() {
    const { tittel, erModalÅpen, lukkModal, args, bredde } = useModal(ModalType.FEILMELDING_MODAL);

    const feilmelding = args?.feilmelding ?? 'Feil oppstod ved innhenting av argumenter for modal.';

    return (
        <Modal
            open={erModalÅpen}
            onClose={lukkModal}
            header={{ heading: tittel, size: 'medium' }}
            portal={true}
            width={bredde}
        >
            {erModalÅpen && (
                <Modal.Body>
                    <Alert variant="error">{feilmelding}</Alert>
                </Modal.Body>
            )}
        </Modal>
    );
}
