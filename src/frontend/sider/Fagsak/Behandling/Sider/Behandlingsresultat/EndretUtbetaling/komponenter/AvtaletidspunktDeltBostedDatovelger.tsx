import * as React from 'react';
import { useRef } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

export const AvtaletidspunktDeltBostedDatovelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control, watch } = useFormContext<EndretUtbetalingAndelFormValues>();

    const årsakErDeltBosted = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK) === IEndretUtbetalingAndelÅrsak.DELT_BOSTED;

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED,
        control,
        disabled: !årsakErDeltBosted,
        shouldUnregister: true,
        rules: {
            validate: value => {
                const dateValidation = dateValidationRef.current;
                if (dateValidation) {
                    if (dateValidation.isEmpty) {
                        return `Avtaletidspunkt for delt bosted er påkrevd`;
                    }
                    if (!dateValidation.isValidDate || dateValidation.isInvalid) {
                        return `Du må velge en gyldig dato`;
                    }
                }
                if (!value) {
                    return `Avtaletidspunkt for delt bosted er påkrevd`;
                }
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value ?? undefined,
        onDateChange: onChange,
        onValidate: validation => (dateValidationRef.current = validation),
    });

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input
                {...inputProps}
                label="Avtaletidspunkt delt bosted"
                ref={ref}
                error={error?.message}
                readOnly={erLesevisning || isSubmitting}
            />
        </DatePicker>
    );
};
