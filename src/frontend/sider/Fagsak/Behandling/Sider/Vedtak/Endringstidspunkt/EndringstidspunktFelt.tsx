import { useErLesevisning } from '@hooks/useErLesevisning';
import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';
import { dateTilIsoDatoString } from '@utils/dato';
import { format, parseISO, startOfToday } from 'date-fns';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Feltnavn, type FormValues } from './useEndringstidspunktForm';

export function EndringstidspunktFelt() {
    const { control, clearErrors, trigger } = useFormContext<FormValues>();

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);
    const erLesevisning = useErLesevisning();

    const {
        field: { onChange, value },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: Feltnavn.ENDRINGSTIDSPUNKT,
        control,
        rules: {
            validate: dato => {
                const dateValidation = dateValidationRef.current;
                if (dateValidation && dateValidation.isBefore) {
                    return `Du må velge en dato som er senere enn 1. ${format(tidligsteRelevanteDato, 'MMMM yyyy')}.`;
                }
                if (dateValidation && dateValidation.isAfter) {
                    return 'Du kan ikke sette en dato som er frem i tid.';
                }
                if (dateValidation && (!dateValidation.isValidDate || dateValidation.isInvalid)) {
                    return 'Du må velge en gyldig dato.';
                }
                if (dateValidation && dateValidation.isEmpty) {
                    return 'Du må velge en gyldig dato.';
                }
                if (!dato) {
                    return 'Du må velge en gyldig dato.';
                }
                return undefined;
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value ? parseISO(value) : undefined,
        onDateChange: dato => {
            clearErrors('root');
            onChange(dato ? dateTilIsoDatoString(dato) : null);
        },
        onValidate: validation => {
            dateValidationRef.current = validation;
            if (isSubmitted) {
                trigger(Feltnavn.ENDRINGSTIDSPUNKT);
            }
        },
        fromDate: tidligsteRelevanteDato,
        toDate: startOfToday(),
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Nytt endringstidspunkt'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                error={error?.message}
                readOnly={erLesevisning || isSubmitting}
            />
        </DatePicker>
    );
}
