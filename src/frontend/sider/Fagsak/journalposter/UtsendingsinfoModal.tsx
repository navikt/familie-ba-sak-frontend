import { Modal } from '@navikt/ds-react';
import type { Utsendingsinfo } from '@navikt/familie-typer';

interface IProps {
    onClose: () => void;
    data: Utsendingsinfo;
}

export const UtsendingsinfoModal = ({ onClose, data: { digitalpostSendt, fysiskpostSendt } }: IProps) => {
    const tittel = digitalpostSendt ? 'Digital post sendt' : 'Sendt per post';
    const adresse = digitalpostSendt?.adresse || fysiskpostSendt?.adressetekstKonvolutt;
    return (
        <Modal
            open
            closeOnBackdropClick
            onClose={onClose}
            width="small"
            header={{ heading: tittel, size: 'small' }}
            portal
        >
            <Modal.Body>{adresse}</Modal.Body>
        </Modal>
    );
};
