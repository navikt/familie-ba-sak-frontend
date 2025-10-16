import React from 'react';

import { Modal } from '@navikt/ds-react';

import type { IModal } from '../../context/AppContext';

interface IProps {
    modal: IModal;
}
const AppInfoModal = ({ modal }: IProps) => {
    return (
        <Modal open onClose={modal.onClose} header={{ heading: modal.tittel, size: 'small' }} width={'medium'} portal>
            <Modal.Body>{modal.innhold && modal.innhold()}</Modal.Body>
            <Modal.Footer>{modal.actions}</Modal.Footer>
        </Modal>
    );
};

export default AppInfoModal;
