import React, { useRef } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { MonthPicker, type MonthValidationT, useMonthpicker } from '@navikt/ds-react';

import { dateTilFormatertString, Datoformat } from '../../../../../../../utils/dato';
import type { EndretUtbetalingAndelFormValues, StandardFeltProps } from '../useEndretUtbetalingAndelRHF';
import { EndretUtbetalingAndelFeltnavn } from '../useEndretUtbetalingAndelRHF';

type MånedfelterNavn = EndretUtbetalingAndelFeltnavn.FOM | EndretUtbetalingAndelFeltnavn.TOM;

interface MånedvelgerProps extends StandardFeltProps {
    name: MånedfelterNavn;
    label: string;
    tidligsteDato: Date;
    senesteDato: Date;
    valgfri?: boolean;
}

const Månedvelger = ({ name, label, erLesevisning, tidligsteDato, senesteDato, valgfri }: MånedvelgerProps) => {
    const { control, trigger } = useFormContext<EndretUtbetalingAndelFormValues>();

    const monthValidationRef = useRef<MonthValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name,
        control,
        rules: {
            validate: value => {
                const monthValidation = monthValidationRef.current;
                if (monthValidation) {
                    if (!valgfri && monthValidation.isEmpty) {
                        return `${label} er påkrevd`;
                    }
                    if (!valgfri && (!monthValidation.isValidMonth || monthValidation.isInvalid)) {
                        return `Du må velge en gyldig måned`;
                    }
                    if (monthValidation.isBefore) {
                        return `Dato kan ikke være før ${dateTilFormatertString({ date: tidligsteDato, tilFormat: Datoformat.MÅNED_ÅR_NAVN })}`;
                    }
                    if (monthValidation.isAfter) {
                        return `Dato kan ikke være etter ${dateTilFormatertString({ date: senesteDato, tilFormat: Datoformat.MÅNED_ÅR_NAVN })}`;
                    }
                }
                if (!valgfri && !value) {
                    return `${label} er påkrevd`;
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
                trigger(
                    name === EndretUtbetalingAndelFeltnavn.FOM
                        ? EndretUtbetalingAndelFeltnavn.TOM
                        : EndretUtbetalingAndelFeltnavn.FOM
                );
            }
        },
        onValidate: validation => {
            monthValidationRef.current = validation;
            trigger(name);
        },
    });

    return (
        <MonthPicker {...monthpickerProps} dropdownCaption>
            <MonthPicker.Input
                {...inputProps}
                label={label}
                ref={ref}
                readOnly={erLesevisning || isSubmitting}
                error={isSubmitted && error?.message}
            />
        </MonthPicker>
    );
};

export default Månedvelger;
