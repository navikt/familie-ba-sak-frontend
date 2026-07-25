import { useState } from 'react';

import { dagensDato } from '@utils/dato';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

import { ValutakursFelt, type ValutakursFormValues } from './useValutakursSkjema';

interface Props {
    readOnly: boolean;
}

export function ValutakursDatoFelt({ readOnly }: Props) {
    const { control, trigger, setValue } = useFormContext<ValutakursFormValues>();

    const [dateValidation, setDateValidation] = useState<DateValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: ValutakursFelt.VALUTAKURSDATO,
        control,
        rules: {
            validate: valgtDato => {
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

    const { datepickerProps, inputProps, setSelected, selectedDay } = useDatepicker({
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
            setDateValidation(validation);
            if (isSubmitted) {
                trigger(ValutakursFelt.VALUTAKURSDATO);
            }
        },
    });

    // Synkroniser datovelgeren dersom feltverdien endres uten at det er datovelgeren som trigget endringen.
    const [forrigeVerdi, settForrigeVerdi] = useState<Date | undefined>(value);
    if (value !== forrigeVerdi) {
        settForrigeVerdi(value);
        if (value !== selectedDay) {
            setSelected(value);
        }
    }

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
