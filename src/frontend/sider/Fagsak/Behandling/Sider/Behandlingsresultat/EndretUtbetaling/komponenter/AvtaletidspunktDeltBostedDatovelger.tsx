import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

const AvtaletidspunktDeltBostedDatovelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control, watch } = useFormContext<EndretUtbetalingAndelFormValues>();

    const årsakErDeltBosted = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK) === IEndretUtbetalingAndelÅrsak.DELT_BOSTED;

    return (
        <Controller
            name={EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED}
            control={control}
            rules={{
                required: årsakErDeltBosted ? 'Avtaletidspunkt for delt bosted er påkrevd' : undefined,
            }}
            disabled={!årsakErDeltBosted}
            shouldUnregister={true}
            render={({ field, fieldState, formState }) => {
                const { datepickerProps, inputProps } = useDatepicker({
                    defaultSelected: field.value,
                    onDateChange: field.onChange,
                });

                return (
                    <DatePicker {...datepickerProps} dropdownCaption>
                        <DatePicker.Input
                            {...inputProps}
                            label="Avtaletidspunkt delt bosted"
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

export default AvtaletidspunktDeltBostedDatovelger;
