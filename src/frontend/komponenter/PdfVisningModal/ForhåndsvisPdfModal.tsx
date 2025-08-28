import React from 'react';

import styled from 'styled-components';

import { Alert, Modal } from '@navikt/ds-react';

import { ModalType } from '../../context/ModalContext';
import { useModal } from '../../hooks/useModal';

const StyledModal = styled(Modal)`
    width: 80%;
    height: 80%;
    overflow: hidden;

    section {
        height: 100%;
        width: 90%;
        margin: 0 auto;
    }
`;

export function ForhåndsvisPdfModal() {
    const { args, erModalÅpen, lukkModal, tittel, bredde } = useModal(ModalType.FORHÅNDSVIS_PDF);
    return (
        <StyledModal
            open={erModalÅpen}
            onClose={lukkModal}
            header={{ heading: tittel, closeButton: true }}
            width={bredde}
            portal={true}
        >
            {erModalÅpen && (
                <>
                    {args === undefined && (
                        <Modal.Body>
                            <Alert variant={'error'}>
                                En feil oppstod ved innlasting av modal.
                            </Alert>
                        </Modal.Body>
                    )}
                    {args !== undefined && (
                        <iframe
                            title={'Dokument'}
                            height={'100%'}
                            width={'100%'}
                            src={window.URL.createObjectURL(args.blob)}
                        />
                    )}
                </>
            )}
        </StyledModal>
    );
}
