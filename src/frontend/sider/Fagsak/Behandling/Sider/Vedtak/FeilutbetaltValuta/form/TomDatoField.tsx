import { useRef } from 'react';

import { endOfMonth, format, isBefore, startOfToday } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { MonthPicker, useMonthpicker, type MonthValidationT } from '@navikt/ds-react';

import { Fields, type FormValues } from './useFeilutbetaltValutaForm';
import { tidligsteRelevanteDato } from '../../../../../../../komponenter/Datovelger/utils';
import { dateTilIsoDatoString, isoStringTilDate } from '../../../../../../../utils/dato';

function parseDatoFieldValueTilDato(datoFieldValue: string | null, fallback: Date): Date {
    return datoFieldValue ? isoStringTilDate(datoFieldValue) : fallback;
}

interface Props {
    readOnly?: boolean;
}

export function TomDatoField({ readOnly = false }: Props) {
    const { control, trigger, watch, getValues } = useFormContext<FormValues>();

    const monthValidationRef = useRef<MonthValidationT | undefined>(undefined);

    const fraDato = parseDatoFieldValueTilDato(watch(Fields.FOM_DATO), tidligsteRelevanteDato);
    const tilDato = startOfToday();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: Fields.TOM_DATO,
        control,
        rules: {
            validate: value => {
                const monthValidation = monthValidationRef.current;
                if (monthValidation && monthValidation.isBefore) {
                    return `Du må velge en måned som er senere enn ${format(fraDato, 'MMMM yyyy')}.`;
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
                const fomDato = parseDatoFieldValueTilDato(getValues(Fields.FOM_DATO), tidligsteRelevanteDato);
                if (isBefore(value, fomDato)) {
                    return `Du må velge en måned som er ${format(fomDato, 'MMMM yyyy')} eller senere.`;
                }
                return undefined;
            },
        },
    });

    const { monthpickerProps, inputProps } = useMonthpicker({
        defaultSelected: value ? isoStringTilDate(value) : undefined,
        onMonthChange: dato => onChange(dato ? dateTilIsoDatoString(endOfMonth(dato)) : null),
        fromDate: fraDato,
        toDate: tilDato,
        onValidate: validation => {
            monthValidationRef.current = validation;
            trigger(Fields.TOM_DATO);
        },
    });

    return (
        <MonthPicker {...monthpickerProps} dropdownCaption={true}>
            <MonthPicker.Input
                {...inputProps}
                label={'T.o.m'}
                readOnly={readOnly || isSubmitting}
                error={error?.message}
            />
        </MonthPicker>
    );
}
