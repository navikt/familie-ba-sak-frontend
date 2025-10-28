import * as React from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal } from '@navikt/ds-react';

import { BegrunnelseFelt } from './BegrunnelseFelt';
import { DødsfallDatoFelt } from './DødsfallDatoFelt';
import { useRegistrerDødsfallDatoSkjema } from './useRegistrerDødsfallDatoSkjema';
import type { IGrunnlagPerson } from '../../typer/person';

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
    erLesevisning: boolean;
}

const RegistrerDødsfallDatoModal = ({ lukkModal, person, erLesevisning }: IProps) => {
    const { form, onSubmit } = useRegistrerDødsfallDatoSkjema({
        lukkModal,
        person,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <Modal
            open
            onClose={lukkModal}
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
                            <DødsfallDatoFelt erLesevisning={erLesevisning} />
                            <BegrunnelseFelt erLesevisning={erLesevisning} />
                        </Fieldset>
                    </Modal.Body>
                    {!erLesevisning && (
                        <Modal.Footer>
                            <Button type={'submit'} variant={'primary'} loading={isSubmitting} disabled={isSubmitting}>
                                Bekreft
                            </Button>
                            <Button onClick={lukkModal} variant={'tertiary'}>
                                Avbryt
                            </Button>
                        </Modal.Footer>
                    )}
                </form>
            </FormProvider>
        </Modal>
    );
};

export default RegistrerDødsfallDatoModal;
