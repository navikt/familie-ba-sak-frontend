import { useRef } from 'react';

import { dagensDato, dateTilIsoDatoString, isoStringTilDate } from '@utils/dato';
import { startOfDay } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

import { SettPåVentFelt, type SettPåVentFormValues } from './useSettPåVentSkjema';

export function FristFelt() {
    const { control, trigger } = useFormContext<SettPåVentFormValues>();

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: SettPåVentFelt.FRIST,
        control,
        rules: {
            validate: value => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation && dateValidation.isBefore) {
                    return 'Du må velge en frist som er frem i tid.';
                }

                if (dateValidation && (dateValidation.isInvalid || !dateValidation.isValidDate)) {
                    return 'Du må velge en gyldig dato.';
                }

                if (!value) {
                    return 'Du må velge en gyldig dato.';
                }

                return undefined;
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: dato => {
            onChange(dato ? dateTilIsoDatoString(startOfDay(dato)) : null);
            if (isSubmitted) {
                trigger(SettPåVentFelt.FRIST);
            }
        },
        fromDate: dagensDato,
        required: true,
        defaultSelected: value ? isoStringTilDate(value) : undefined,
        onValidate: validation => {
            dateValidationRef.current = validation;
            trigger(SettPåVentFelt.FRIST);
        },
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Frist'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={isSubmitting}
                error={error?.message}
            />
        </DatePicker>
    );
}
