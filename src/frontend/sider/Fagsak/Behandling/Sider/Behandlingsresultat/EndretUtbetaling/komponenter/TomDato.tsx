import React, { useRef } from 'react';

import { isBefore, max } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { MonthPicker, type MonthValidationT, useMonthpicker } from '@navikt/ds-react';

import { tidligsteRelevanteDato } from '../../../../../../../komponenter/Datovelger/utils';
import { dateTilFormatertString, Datoformat } from '../../../../../../../utils/dato';
import type { EndretUtbetalingAndelFormValues, StandardFeltProps } from '../useEndretUtbetalingAndelRHF';
import { EndretUtbetalingAndelFeltnavn } from '../useEndretUtbetalingAndelRHF';

interface TomDatoProps extends StandardFeltProps {
    tidligsteDato: Date;
    senesteDato: Date;
    valgfri?: boolean;
}

export const TomDato = ({ erLesevisning, tidligsteDato, senesteDato, valgfri }: TomDatoProps) => {
    const { control, trigger, getValues, watch } = useFormContext<EndretUtbetalingAndelFormValues>();

    const monthValidationRef = useRef<MonthValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: EndretUtbetalingAndelFeltnavn.TOM,
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
                    if (!valgfri && monthValidation.isEmpty) {
                        return `T.o.m. er påkrevd`;
                    }
                    if (!valgfri && (!monthValidation.isValidMonth || monthValidation.isInvalid)) {
                        return `Du må velge en gyldig måned`;
                    }
                }
                if (!valgfri && !value) {
                    return `T.o.m. er påkrevd`;
                }
                const fomDato = getValues(EndretUtbetalingAndelFeltnavn.FOM);
                if (fomDato && value && isBefore(value, fomDato)) {
                    return `T.o.m. kan ikke være før f.o.m.`;
                }
            },
        },
    });

    const fomDato = watch(EndretUtbetalingAndelFeltnavn.FOM) ?? tidligsteRelevanteDato;
    const { monthpickerProps, inputProps } = useMonthpicker({
        defaultSelected: value ?? undefined,
        fromDate: max([tidligsteDato, fomDato]),
        toDate: senesteDato,
        onMonthChange: onChange,
        onValidate: validation => {
            monthValidationRef.current = validation;
            trigger(EndretUtbetalingAndelFeltnavn.TOM);
        },
    });

    return (
        <MonthPicker {...monthpickerProps} dropdownCaption>
            <MonthPicker.Input
                {...inputProps}
                label={'T.o.m.' + (valgfri ? ' (valgfri)' : '')}
                ref={ref}
                readOnly={erLesevisning || isSubmitting}
                error={error?.message}
            />
        </MonthPicker>
    );
};
