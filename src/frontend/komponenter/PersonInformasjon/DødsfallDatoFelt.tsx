import * as React from 'react';

import { startOfDay } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { RegistrerDødsfallDatoFelt, type RegistrerDødsfallDatoFormValues } from './useRegistrerDødsfallDatoSkjema';

interface Props {
    erLesevisning: boolean;
}

export function DødsfallDatoFelt({ erLesevisning }: Props) {
    const { control } = useFormContext<RegistrerDødsfallDatoFormValues>();

    const {
        field,
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerDødsfallDatoFelt.DØDSFALL_DATO,
        control,
        rules: { required: 'Du må velge en gyldig dato.' },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: field.onChange,
        toDate: startOfDay(new Date()),
        required: true,
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Dødsdato'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                disabled={isSubmitting}
                readOnly={isSubmitting || erLesevisning}
                error={error?.message}
            />
        </DatePicker>
    );
}
