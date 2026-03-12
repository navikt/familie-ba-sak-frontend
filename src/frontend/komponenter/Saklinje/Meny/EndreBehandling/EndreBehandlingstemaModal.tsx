import React from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal } from '@navikt/ds-react';

import { useEndreBehandlingstemaSkjema } from './useEndreBehandlingstema';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { BehandlingstemaSelect } from '../../../BehandlingstemaSelect';

interface Props {
    lukkModal: () => void;
}

export const EndreBehandlingstemaModal = ({ lukkModal }: Props) => {
    const { fagsak } = useFagsakContext();
    const { form, onSubmit } = useEndreBehandlingstemaSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = form;

    const onClose = () => {
        lukkModal();
        reset(); // TODO: use reset or nullstillSkjema?
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
                            <BehandlingstemaSelect fagsakType={fagsak.fagsakType} />
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
