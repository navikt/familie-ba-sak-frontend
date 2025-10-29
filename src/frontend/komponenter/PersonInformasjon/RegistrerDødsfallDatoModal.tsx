import * as React from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal } from '@navikt/ds-react';

import { BegrunnelseFelt } from './BegrunnelseFelt';
import { DødsfallDatoFelt } from './DødsfallDatoFelt';
import { useRegistrerDødsfallDatoSkjema } from './useRegistrerDødsfallDatoSkjema';
import type { IGrunnlagPerson } from '../../typer/person';

interface Props {
    lukkModal: () => void;
    person: IGrunnlagPerson;
}

export const RegistrerDødsfallDatoModal = ({ lukkModal, person }: Props) => {
    const { form, onSubmit } = useRegistrerDødsfallDatoSkjema({
        lukkModal,
        person,
    });

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
            header={{
                heading: 'Registrere dødsdato',
                size: 'medium',
            }}
            width={'35rem'}
            portal
        >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Fieldset
                            legend="Registrer dødsfall"
                            hideLegend
                            error={errors.root?.message}
                            errorPropagation={false}
                        >
                            <DødsfallDatoFelt />
                            <BegrunnelseFelt />
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={'submit'} variant={'primary'} loading={isSubmitting} disabled={isSubmitting}>
                            Bekreft
                        </Button>
                        <Button onClick={onClose} variant={'tertiary'}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
};
