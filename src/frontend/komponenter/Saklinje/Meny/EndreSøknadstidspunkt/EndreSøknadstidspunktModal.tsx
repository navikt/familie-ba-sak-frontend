import { useHentRegistrertSøknadstidspunktPåPerson } from '@hooks/useHentRegistrertSøknadstidspunktPåPerson';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';

import { Alert, Button, HStack, Loader, Modal } from '@navikt/ds-react';

import { EndreSøknadstidspunktSkjema } from './EndreSøknadstidspunktSkjema';

interface Props {
    lukkModal: () => void;
}

export const EndreSøknadstidspunktModal = ({ lukkModal }: Props) => {
    const { behandling } = useBehandlingContext();
    const {
        data: søknadstidspunkter,
        isPending,
        isError,
    } = useHentRegistrertSøknadstidspunktPåPerson(behandling.behandlingId);

    return (
        <Modal open onClose={lukkModal} header={{ heading: 'Endre søknadstidspunkt' }} width={'35rem'} portal>
            {isPending ? (
                <Modal.Body aria-busy="true" aria-live="polite">
                    <HStack justify="center">
                        <Loader size="large" title="Henter søknadstidspunkt" />
                    </HStack>
                </Modal.Body>
            ) : isError ? (
                <>
                    <Modal.Body>
                        <Alert variant="error">Kunne ikke hente søknadstidspunkt.</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" size="small" onClick={lukkModal}>
                            Lukk
                        </Button>
                    </Modal.Footer>
                </>
            ) : søknadstidspunkter.length === 0 ? (
                <>
                    <Modal.Body>
                        <Alert variant="info">
                            Det er ikke registrert søknadstidspunkt for noen barn på denne behandlingen.
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" size="small" onClick={lukkModal}>
                            Lukk
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <EndreSøknadstidspunktSkjema lukkModal={lukkModal} søknadstidspunkter={søknadstidspunkter} />
            )}
        </Modal>
    );
};
