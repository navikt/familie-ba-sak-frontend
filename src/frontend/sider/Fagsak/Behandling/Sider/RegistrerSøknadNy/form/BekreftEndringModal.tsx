import { useBekreftEndringModalContext } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/BekreftEndringModalContext';
import {
    type RegistrerSøknadFormValues,
    type TransformedRegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { useFormContext } from 'react-hook-form';

import { BodyShort, Button, Modal } from '@navikt/ds-react';

import Styles from './BekreftEndringModal.module.css';

interface Props {
    onSubmit: (values: TransformedRegistrerSøknadFormValues, modus: 'ubekreftet' | 'bekreftet') => Promise<void>;
}

export function BekreftEndringModal({ onSubmit }: Props) {
    const {
        erBekreftEndringModalÅpen,
        bekreftEndringFeilmelding,
        settBekreftEndringFeilmelding,
        lukkBekreftEndringModal,
    } = useBekreftEndringModalContext();

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useFormContext<RegistrerSøknadFormValues, unknown, TransformedRegistrerSøknadFormValues>();

    async function bekreft() {
        try {
            await handleSubmit(data => onSubmit(data, 'bekreftet'))();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            settBekreftEndringFeilmelding(message);
        }
    }

    function avbryt() {
        lukkBekreftEndringModal();
    }

    return (
        <Modal
            open={erBekreftEndringModalÅpen}
            onClose={avbryt}
            header={{ heading: 'Er du sikker på at du vil gå videre?' }}
            width={'35rem'}
        >
            <Modal.Body>
                <BodyShort className={Styles.innhold}>{bekreftEndringFeilmelding}</BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button type={'button'} variant={'primary'} onClick={bekreft} loading={isSubmitting}>
                    Ja
                </Button>
                <Button type={'button'} variant={'secondary'} onClick={avbryt} disabled={isSubmitting}>
                    Nei
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
