import React, { useRef } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { MonthPicker, type MonthValidationT, useMonthpicker } from '@navikt/ds-react';

import { dateTilFormatertString, Datoformat } from '../../../../../../../utils/dato';
import type { EndretUtbetalingAndelFormValues, StandardFeltProps } from '../useEndretUtbetalingAndelRHF';
import { EndretUtbetalingAndelFeltnavn } from '../useEndretUtbetalingAndelRHF';

interface TomDatoProps extends StandardFeltProps {
    tidligsteDato: Date;
    senesteDato: Date;
}

export const FomDato = ({ erLesevisning, tidligsteDato, senesteDato }: TomDatoProps) => {
    const { control, trigger } = useFormContext<EndretUtbetalingAndelFormValues>();

    const monthValidationRef = useRef<MonthValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: EndretUtbetalingAndelFeltnavn.FOM,
        control,
        rules: {
            validate: value => {
                const monthValidation = monthValidationRef.current;
                if (monthValidation) {
                    if (monthValidation.isBefore) {
                        return `Valgt måned kan ikke være før ${dateTilFormatertString({ date: tidligsteDato, tilFormat: Datoformat.MÅNED_ÅR_NAVN })}`;
                    }
                    if (monthValidation.isAfter) {
                        return `Valgt måned kan ikke være etter ${dateTilFormatertString({ date: senesteDato, tilFormat: Datoformat.MÅNED_ÅR_NAVN })}`;
                    }
                    if (monthValidation.isEmpty) {
                        return `F.o.m. er påkrevd`;
                    }
                    if (!monthValidation.isValidMonth || monthValidation.isInvalid) {
                        return `Du må velge en gyldig måned`;
                    }
                }
                if (!value) {
                    return `F.o.m. er påkrevd`;
                }
            },
        },
    });

    const { monthpickerProps, inputProps } = useMonthpicker({
        defaultSelected: value,
        fromDate: tidligsteDato,
        toDate: senesteDato,
        onMonthChange: dato => {
            onChange(dato);
            if (isSubmitted) {
                trigger(EndretUtbetalingAndelFeltnavn.TOM);
            }
        },
        onValidate: validation => {
            monthValidationRef.current = validation;
            trigger(EndretUtbetalingAndelFeltnavn.FOM);
        },
    });

    return (
        <MonthPicker {...monthpickerProps} dropdownCaption>
            <MonthPicker.Input
                {...inputProps}
                label={'F.o.m.'}
                ref={ref}
                readOnly={erLesevisning || isSubmitting}
                error={isSubmitted && error?.message}
            />
        </MonthPicker>
    );
};
