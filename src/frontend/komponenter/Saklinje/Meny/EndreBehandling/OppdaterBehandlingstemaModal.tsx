import React from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal } from '@navikt/ds-react';

import { useOppdaterBehandlingstemaSkjema } from './useOppdaterBehandlingstemaSkjema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { BehandlingstemaSelect } from '../../../BehandlingstemaSelect';

interface Props {
    lukkModal: () => void;
}

export const OppdaterBehandlingstemaModal = ({ lukkModal }: Props) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { form, onSubmit } = useOppdaterBehandlingstemaSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = form;

    const onClose = () => {
        lukkModal();
        reset();
    };

    return (
        <Modal
            open
            onClose={onClose}
            header={{ heading: 'Endre behandlingstema', size: 'small' }}
            width={'35rem'}
            portal
        >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Fieldset error={errors.root?.message} legend="Endre behandlingstema" hideLegend>
                            <BehandlingstemaSelect erLesevisning={vurderErLesevisning()} />
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'bekreft'}
                            type={'submit'}
                            variant="primary"
                            size="small"
                            children={'Bekreft'}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        />
                        <Button key={'avbryt'} variant="secondary" size="small" onClick={onClose} children={'Avbryt'} />
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
};
