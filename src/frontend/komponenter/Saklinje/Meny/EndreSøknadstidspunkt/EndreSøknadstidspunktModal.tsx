import { useBehandling } from '@hooks/useBehandling';
import { useHentRegistrerteSøknadstidspunkter } from '@hooks/useHentRegistrerteSøknadstidspunkter';

import { Alert, BodyShort, Button, Loader, Modal, VStack } from '@navikt/ds-react';

import { EndreSøknadstidspunktSkjema } from './EndreSøknadstidspunktSkjema';

interface Props {
    lukkModal: () => void;
}

const modalProps = (lukkModal: () => void) =>
    ({
        open: true,
        onClose: lukkModal,
        header: { heading: 'Endre søknadstidspunkt' },
        width: '35rem',
        portal: true,
    }) as const;

const LukkKnapp = ({ lukkModal }: Props) => (
    <Button type="button" variant="secondary" size="small" onClick={lukkModal}>
        Lukk
    </Button>
);

export const EndreSøknadstidspunktModal = ({ lukkModal }: Props) => {
    const behandling = useBehandling();
    const {
        data: søknadstidspunkter,
        isPending: søknadstidspunkterIsPending,
        error: søknadstidspunkterError,
    } = useHentRegistrerteSøknadstidspunkter(behandling.behandlingId);

    if (søknadstidspunkterIsPending) {
        return (
            <Modal {...modalProps(lukkModal)}>
                <Modal.Body aria-busy="true" aria-live="polite">
                    <VStack gap="space-8" align="center">
                        <Loader size="large" title="Laster søknadstidspunkt" />
                        <BodyShort>Laster søknadstidspunkt</BodyShort>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <LukkKnapp lukkModal={lukkModal} />
                </Modal.Footer>
            </Modal>
        );
    }

    if (søknadstidspunkterError) {
        return (
            <Modal {...modalProps(lukkModal)}>
                <Modal.Body>
                    <Alert variant="error">Kunne ikke hente søknadstidspunkt: {søknadstidspunkterError.message}</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <LukkKnapp lukkModal={lukkModal} />
                </Modal.Footer>
            </Modal>
        );
    }

    if (søknadstidspunkter.length === 0) {
        return (
            <Modal {...modalProps(lukkModal)}>
                <Modal.Body>
                    <Alert variant="info">
                        Det er ikke registrert søknadstidspunkt for noen barn på denne behandlingen.
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <LukkKnapp lukkModal={lukkModal} />
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Modal {...modalProps(lukkModal)}>
            <EndreSøknadstidspunktSkjema lukkModal={lukkModal} søknadstidspunkter={søknadstidspunkter} />
        </Modal>
    );
};
