import { Dialog } from '@navikt/ds-react';
import type { Utsendingsinfo } from '@navikt/familie-typer';

interface IProps {
    onClose: () => void;
    data: Utsendingsinfo;
}

export const UtsendingsinfoModal = ({ onClose, data: { digitalpostSendt, fysiskpostSendt } }: IProps) => {
    const tittel = digitalpostSendt ? 'Digital post sendt' : 'Sendt per post';
    const adresse = digitalpostSendt?.adresse || fysiskpostSendt?.adressetekstKonvolutt;
    return (
        <Dialog open onOpenChange={onClose} size={'small'}>
            <Dialog.Popup closeOnOutsideClick width={'small'}>
                <Dialog.Header>
                    <Dialog.Title>{tittel}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>{adresse}</Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};
