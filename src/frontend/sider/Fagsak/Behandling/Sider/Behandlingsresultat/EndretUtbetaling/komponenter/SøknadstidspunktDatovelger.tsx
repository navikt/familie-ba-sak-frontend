import * as React from 'react';
import { useRef } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

const SøknadstidspunktDatovelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control } = useFormContext<EndretUtbetalingAndelFormValues>();

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT,
        control,
        rules: {
            validate: value => {
                const dateValidation = dateValidationRef.current;
                if (dateValidation) {
                    if (dateValidation.isEmpty) {
                        return `Søknadstidspunkt er påkrevd`;
                    }
                    if (!dateValidation.isValidDate || dateValidation.isInvalid) {
                        return `Du må velge en gyldig dato`;
                    }
                }
                if (!value) {
                    return `Søknadstidspunkt er påkrevd`;
                }
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value,
        onDateChange: onChange,
        onValidate: validation => (dateValidationRef.current = validation),
    });

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input
                {...inputProps}
                label="Søknadstidspunkt"
                ref={ref}
                error={error?.message}
                readOnly={erLesevisning || isSubmitting}
            />
        </DatePicker>
    );
};

export default SøknadstidspunktDatovelger;
