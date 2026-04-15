import React from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal } from '@navikt/ds-react';

import { BehandlingstemaSelect } from './BehandlingstemaSelect';
import { useEndreBehandlingstemaSkjema } from './useEndreBehandlingstemaSkjema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';

interface Props {
    lukkModal: () => void;
}

export const EndreBehandlingstemaModal = ({ lukkModal }: Props) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { form, onSubmit } = useEndreBehandlingstemaSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const onClose = () => {
        lukkModal();
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
                        <Button type={'submit'} variant="primary" size="small" loading={isSubmitting}>
                            Bekreft
                        </Button>
                        <Button variant="secondary" size="small" onClick={onClose}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
};
