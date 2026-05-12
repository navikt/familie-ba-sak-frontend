import { useRef } from 'react';

import { format, startOfMonth, startOfToday } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { MonthPicker, useMonthpicker, type MonthValidationT } from '@navikt/ds-react';

import { Fields, type FormValues } from './useFeilutbetaltValutaForm';
import { tidligsteRelevanteDato } from '../../../../../../../komponenter/Datovelger/utils';
import { dateTilIsoDatoString, isoStringTilDate } from '../../../../../../../utils/dato';

interface Props {
    readOnly?: boolean;
}

export function FomDatoField({ readOnly = false }: Props) {
    const { control, trigger } = useFormContext<FormValues>();

    const monthValidationRef = useRef<MonthValidationT | undefined>(undefined);

    const fomDato = tidligsteRelevanteDato;
    const tilDato = startOfToday();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: Fields.FOM_DATO,
        control,
        rules: {
            validate: value => {
                const monthValidation = monthValidationRef.current;
                if (monthValidation && monthValidation.isBefore) {
                    return `Du må velge en måned som er senere enn ${format(fomDato, 'MMMM yyyy')}.`;
                }
                if (monthValidation && monthValidation.isAfter) {
                    return 'Du kan ikke sette en måned som er frem i tid.';
                }
                if (monthValidation && (!monthValidation.isValidMonth || monthValidation.isInvalid)) {
                    return 'Du må velge en gyldig måned.';
                }
                if (monthValidation && monthValidation.isEmpty) {
                    return 'Du må velge en gyldig måned.';
                }
                if (!value) {
                    return 'Du må velge en gyldig måned.';
                }
                return undefined;
            },
        },
    });

    const { monthpickerProps, inputProps, selectedMonth } = useMonthpicker({
        defaultSelected: value ? isoStringTilDate(value) : undefined,
        onMonthChange: dato => {
            onChange(dato ? dateTilIsoDatoString(startOfMonth(dato)) : null);
            if (isSubmitted) {
                trigger(Fields.TOM_DATO);
            }
        },
        fromDate: fomDato,
        toDate: tilDato,
        onValidate: validation => {
            monthValidationRef.current = validation;
            trigger(Fields.FOM_DATO);
        },
    });

    return (
        <MonthPicker {...monthpickerProps} dropdownCaption={true} selected={selectedMonth}>
            <MonthPicker.Input
                {...inputProps}
                label={'F.o.m'}
                readOnly={readOnly || isSubmitting}
                error={error?.message}
            />
        </MonthPicker>
    );
}
