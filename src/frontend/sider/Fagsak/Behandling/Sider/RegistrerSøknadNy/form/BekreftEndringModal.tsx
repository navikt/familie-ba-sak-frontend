import { useState } from 'react';

import { useBekreftEndringModalContext } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/BekreftEndringModalContext';
import type {
    RegistrerSøknadFormValues,
    TransformedRegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { useFormContext } from 'react-hook-form';

import { BodyShort, Button, Modal } from '@navikt/ds-react';

import Styles from './BekreftEndringModal.module.css';

interface Props {
    onSubmit: (values: TransformedRegistrerSøknadFormValues, modus: 'ubekreftet' | 'bekreftet') => Promise<void>;
}

export function BekreftEndringModal({ onSubmit }: Props) {
    const { erBekreftEndringModalÅpen, lukkBekreftEndringModal } = useBekreftEndringModalContext();

    const {
        handleSubmit,
        setError,
        clearErrors,
        formState: { isSubmitting, errors },
    } = useFormContext<RegistrerSøknadFormValues, unknown, TransformedRegistrerSøknadFormValues>();

    const [lokalFeilmelding, settLokalFeilmelding] = useState<string | undefined>(undefined);

    async function bekreft() {
        try {
            settLokalFeilmelding(errors.root?.message);
            await handleSubmit(data => onSubmit(data, 'bekreftet'))();
            settLokalFeilmelding(undefined);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
            settLokalFeilmelding(message);
        }
    }

    function avbryt() {
        lukkBekreftEndringModal();
        clearErrors('root');
    }

    return (
        <Modal
            open={erBekreftEndringModalÅpen}
            onClose={avbryt}
            header={{ heading: 'Er du sikker på at du vil gå videre?' }}
            width={'35rem'}
        >
            <Modal.Body>
                <BodyShort className={Styles.innhold}>{lokalFeilmelding || errors.root?.message}</BodyShort>
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
