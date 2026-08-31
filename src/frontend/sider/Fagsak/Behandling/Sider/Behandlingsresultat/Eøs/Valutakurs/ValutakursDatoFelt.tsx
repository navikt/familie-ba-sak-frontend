import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

import { dagensDato } from '@utils/dato';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { ValutakursFelt, type ValutakursFormValues } from './useValutakursSkjema';

interface Props {
    readOnly: boolean;
}

export function ValutakursDatoFelt({ readOnly }: Props) {
    const { control, trigger, setValue } = useFormContext<ValutakursFormValues>();

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: ValutakursFelt.VALUTAKURSDATO,
        control,
        rules: {
            validate: valgtDato => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation?.isWeekend) {
                    return 'Du må velge en dato som er en ukedag';
                }
                if (dateValidation?.isAfter) {
                    return 'Du kan ikke sette en dato som er frem i tid';
                }
                if (!valgtDato || dateValidation?.isInvalid || (dateValidation && !dateValidation.isValidDate)) {
                    return 'Du må velge en gyldig dato';
                }
                return undefined;
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value,
        toDate: dagensDato,
        disableWeekends: true,
        onDateChange: dato => {
            onChange(dato);
            // Når valutakursdato endres må registrert kurs nullstilles slik at ny kurs hentes/registreres.
            setValue(ValutakursFelt.KURS, '', { shouldDirty: true });
            if (isSubmitted) {
                trigger(ValutakursFelt.VALUTAKURSDATO);
            }
        },
        onValidate: validation => {
            dateValidationRef.current = validation;
            if (isSubmitted) {
                trigger(ValutakursFelt.VALUTAKURSDATO);
            }
        },
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Valutakursdato'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                ref={ref}
                readOnly={readOnly || isSubmitting}
                error={error?.message}
            />
        </DatePicker>
    );
}
