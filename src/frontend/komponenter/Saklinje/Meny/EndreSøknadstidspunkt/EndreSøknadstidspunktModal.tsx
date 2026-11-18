import { useBehandling } from '@hooks/useBehandling';
import { useHentRegistrerteSøknadstidspunkter } from '@hooks/useHentRegistrerteSøknadstidspunkter';

import { Alert, BodyShort, Button, Dialog, Loader, VStack } from '@navikt/ds-react';
import { erRevurderingKlage } from '@typer/behandling';

import { EndreSøknadstidspunktSkjema } from './EndreSøknadstidspunktSkjema';

interface Props {
    lukkModal: () => void;
}

const modalProps = (lukkModal: () => void) =>
    ({
        open: true,
        onOpenChange: lukkModal,
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
            <Dialog {...modalProps(lukkModal)}>
                <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                    <Dialog.Header>
                        <Dialog.Title>Endre søknadstidspunkt</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body aria-busy="true" aria-live="polite">
                        <VStack gap="space-8" align="center">
                            <Loader size="large" title="Laster søknadstidspunkt" />
                            <BodyShort>Laster søknadstidspunkt</BodyShort>
                        </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <LukkKnapp lukkModal={lukkModal} />
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        );
    }

    if (søknadstidspunkterError) {
        return (
            <Dialog {...modalProps(lukkModal)}>
                <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                    <Dialog.Header>
                        <Dialog.Title>Endre søknadstidspunkt</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Alert variant="error">
                            Kunne ikke hente søknadstidspunkt: {søknadstidspunkterError.message}
                        </Alert>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <LukkKnapp lukkModal={lukkModal} />
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        );
    }

    const skalViseIngenSøknadstidspunktMelding = søknadstidspunkter.length === 0 && !erRevurderingKlage(behandling);

    if (skalViseIngenSøknadstidspunktMelding) {
        return (
            <Dialog {...modalProps(lukkModal)}>
                <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                    <Dialog.Header>
                        <Dialog.Title>Endre søknadstidspunkt</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Alert variant="info">
                            Det er ikke registrert søknadstidspunkt for noen barn på denne behandlingen.
                        </Alert>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <LukkKnapp lukkModal={lukkModal} />
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        );
    }

    return (
        <Dialog {...modalProps(lukkModal)}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Endre søknadstidspunkt</Dialog.Title>
                </Dialog.Header>
                <EndreSøknadstidspunktSkjema lukkModal={lukkModal} søknadstidspunkter={søknadstidspunkter} />
            </Dialog.Popup>
        </Dialog>
    );
};
