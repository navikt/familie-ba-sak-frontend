import { BodyShort, Box, Modal } from '@navikt/ds-react';

export function UgyldigSesjon() {
    return (
        <Modal
            open={true}
            portal={true}
            header={{ heading: 'Ugyldig sesjon', closeButton: false }}
            width={'medium'}
            onClose={() => {}}
        >
            <Modal.Body>
                <Box marginBlock={'space-24'}>
                    <BodyShort>Prøv å last siden inn på nytt.</BodyShort>
                </Box>
            </Modal.Body>
        </Modal>
    );
}
