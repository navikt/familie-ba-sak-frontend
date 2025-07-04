import React from 'react';

import { Alert, Button, Modal } from '@navikt/ds-react';

import { OpprettFagsakModalInnhold } from './OpprettFagsakModalInnhold';
import { ModalType } from '../../../context/ModalContext';
import { useModal } from '../../../hooks/useModal';

export function OpprettFagsakModal() {
    const { tittel, erModalÅpen, lukkModal, args, bredde } = useModal(ModalType.OPPRETT_FAGSAK);

    return (
        <Modal
            open={erModalÅpen}
            onClose={lukkModal}
            header={{ heading: tittel, size: 'medium' }}
            portal={true}
            width={bredde}
        >
            {erModalÅpen && (
                <>
                    {args === undefined && (
                        <>
                            <Modal.Body>
                                <Alert variant={'error'}>
                                    Feil oppstod ved innhenting av argumenter for modal.
                                </Alert>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button key={'Bekreft'} variant={'primary'} disabled={true}>
                                    Opprett fagsak
                                </Button>
                                <Button key={'avbryt'} variant={'tertiary'} onClick={lukkModal}>
                                    Avbryt
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                    {args !== undefined && <OpprettFagsakModalInnhold personIdent={args.ident} />}
                </>
            )}
        </Modal>
    );
}
