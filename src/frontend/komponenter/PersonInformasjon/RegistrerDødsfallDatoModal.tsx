import { Button, Dialog, Fieldset } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import { FormProvider } from 'react-hook-form';
import { BegrunnelseFelt } from './BegrunnelseFelt';
import { DødsfallDatoFelt } from './DødsfallDatoFelt';
import { useRegistrerDødsfallDatoSkjema } from './useRegistrerDødsfallDatoSkjema';

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
        <Dialog open onOpenChange={onClose}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Registrere dødsdato</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} id={'registrer-dodsfall-dato-form'}>
                            <Fieldset
                                legend="Registrer dødsfall"
                                hideLegend
                                error={errors.root?.message}
                                errorPropagation={false}
                            >
                                <DødsfallDatoFelt />
                                <BegrunnelseFelt />
                            </Fieldset>
                        </form>
                    </FormProvider>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button onClick={onClose} variant={'tertiary'}>
                        Avbryt
                    </Button>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        loading={isSubmitting}
                        form={'registrer-dodsfall-dato-form'}
                    >
                        Bekreft
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
