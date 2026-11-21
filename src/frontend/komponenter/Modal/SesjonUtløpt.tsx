import { BodyShort, Box, Dialog } from '@navikt/ds-react';

export function UgyldigSesjon() {
    return (
        <Dialog open={true} onOpenChange={() => {}}>
            <Dialog.Popup width={'medium'} closeOnOutsideClick={false}>
                <Dialog.Header withClosebutton={false}>
                    <Dialog.Title>Ugyldig sesjon</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Box marginBlock={'space-24'}>
                        <BodyShort>Prøv å last siden inn på nytt.</BodyShort>
                    </Box>
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
}
