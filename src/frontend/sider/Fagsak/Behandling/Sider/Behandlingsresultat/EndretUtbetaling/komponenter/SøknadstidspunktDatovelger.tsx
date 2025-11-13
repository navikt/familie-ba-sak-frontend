import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

const SøknadstidspunktDatovelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control } = useFormContext<EndretUtbetalingAndelFormValues>();

    return (
        <Controller
            name={EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT}
            control={control}
            rules={{ required: 'Søknadstidspunkt er påkrevd' }}
            render={({ field, fieldState, formState }) => {
                const { datepickerProps, inputProps } = useDatepicker({
                    defaultSelected: field.value,
                    onDateChange: field.onChange,
                });

                return (
                    <DatePicker {...datepickerProps} dropdownCaption>
                        <DatePicker.Input
                            {...inputProps}
                            label="Søknadstidspunkt"
                            ref={field.ref}
                            error={fieldState.error?.message}
                            readOnly={erLesevisning || formState.isSubmitting}
                        />
                    </DatePicker>
                );
            }}
        />
    );
};

export default SøknadstidspunktDatovelger;
