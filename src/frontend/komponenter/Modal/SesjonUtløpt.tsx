import type { FC } from 'react';

import { BodyShort, Modal } from '@navikt/ds-react';

const UgyldigSesjon: FC = () => {
    return (
        <Modal header={{ heading: 'Ugyldig sesjon', size: 'small', closeButton: false }} width={'small'}>
            <Modal.Body>
                <BodyShort>Prøv å last siden på nytt</BodyShort>
            </Modal.Body>
        </Modal>
    );
};

export default UgyldigSesjon;
