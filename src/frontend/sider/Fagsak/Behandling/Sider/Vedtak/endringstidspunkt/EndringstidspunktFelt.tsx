import * as React from 'react';
import { useRef } from 'react';

import { format, parseISO, startOfToday } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

import { Feltnavn, type FormValues } from './useEndringstidspunktForm';
import { tidligsteRelevanteDato } from '../../../../../../komponenter/Datovelger/utils';
import { dateTilFormatertString, Datoformat } from '../../../../../../utils/dato';

interface Props {
    readOnly: boolean;
}

export function EndringstidspunktFelt({ readOnly }: Props) {
    const { control, clearErrors, trigger } = useFormContext<FormValues>();

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const fomDato = tidligsteRelevanteDato;
    const tomDato = startOfToday();

    const {
        field: { onChange, value },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: Feltnavn.ENDRINGSTIDSPUNKT,
        control,
        rules: {
            required: `Nytt endringstidspunkt er påkrevd.`,
            validate: dato => {
                const dateValidation = dateValidationRef.current;
                if (dateValidation && dateValidation.isBefore) {
                    return `Du må velge en dato som er senere enn 1. ${format(fomDato, 'MMMM yyyy')}.`;
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
            clearErrors();
            onChange(
                dateTilFormatertString({
                    date: dato,
                    tilFormat: Datoformat.ISO_DAG,
                    defaultString: inputProps.value?.toString(),
                })
            );
        },
        onValidate: validation => {
            dateValidationRef.current = validation;
            trigger(Feltnavn.ENDRINGSTIDSPUNKT);
        },
        fromDate: fomDato,
        toDate: tomDato,
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Nytt endringstidspunkt'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                error={error?.message}
                readOnly={readOnly || isSubmitting}
            />
        </DatePicker>
    );
}
