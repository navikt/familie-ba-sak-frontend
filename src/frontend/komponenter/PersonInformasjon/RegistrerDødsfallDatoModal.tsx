import * as React from 'react';

import { startOfDay } from 'date-fns';
import { useController } from 'react-hook-form';

import { Button, DatePicker, Fieldset, Modal, Textarea, useDatepicker } from '@navikt/ds-react';

import { useRegistrerDødsfallDatoSkjema } from './useRegistrerDødsfallDatoSkjema';
import type { IGrunnlagPerson } from '../../typer/person';

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
    erLesevisning: boolean;
}

const RegistrerDødsfallDatoModal = ({ lukkModal, person, erLesevisning }: IProps) => {
    const { form, registrerDødsfall, erSkjemaGyldig, registrerDødsfallDatoPending } = useRegistrerDødsfallDatoSkjema({
        lukkModal,
        person,
    });

    const { control, register } = form;

    const { field, fieldState, formState } = useController({
        name: 'dødsfallDato',
        control,
        rules: {
            required: 'Du må velge en gyldig dato.',
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: field.onChange,
        toDate: startOfDay(new Date()),
        required: true,
    });

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
            <Modal.Body>
                <Fieldset
                    legend="Registrer dødsfall"
                    hideLegend
                    error={form.formState.errors.root?.message}
                    errorPropagation={false}
                >
                    <DatePicker {...datepickerProps}>
                        <DatePicker.Input
                            {...inputProps}
                            label={'Dødsdato'}
                            placeholder={'DD.MM.ÅÅÅÅ'}
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            disabled={formState.isSubmitting}
                            readOnly={formState.isSubmitting && erLesevisning}
                            error={fieldState.error?.message}
                        />
                    </DatePicker>
                    <Textarea
                        {...register('begrunnelse', {
                            required: 'Begrunnelse for manuell registrering av dødsfall er påkrevd.',
                        })}
                        error={form.formState.errors.begrunnelse?.message}
                        id={'manuell-dødsdato-begrunnelse'}
                        label={'Begrunnelse'}
                        readOnly={erLesevisning}
                    />
                </Fieldset>
            </Modal.Body>
            {!erLesevisning && (
                <Modal.Footer>
                    <Button
                        onClick={form.handleSubmit(registrerDødsfall)}
                        variant={erSkjemaGyldig(form.getValues()) ? 'primary' : 'secondary'}
                        loading={registrerDødsfallDatoPending}
                        disabled={registrerDødsfallDatoPending}
                    >
                        Bekreft
                    </Button>
                    <Button onClick={lukkModal} variant={'tertiary'}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default RegistrerDødsfallDatoModal;
