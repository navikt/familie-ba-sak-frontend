import { startOfDay } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { Fields, type FormValues } from './useLeggTilBarnForm';

export function FødselsdatoField() {
    const { control } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.FØDSELSDATO,
        control,
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: field.onChange,
        toDate: startOfDay(new Date()),
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Fødselsdato (valgfri)'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                disabled={formState.isSubmitting}
                readOnly={formState.isSubmitting}
                error={fieldState.error?.message}
            />
        </DatePicker>
    );
}
