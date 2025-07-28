import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { MonthPicker, useMonthpicker } from '@navikt/ds-react';

import type {
    EndretUtbetalingAndelFeltnavn,
    EndretUtbetalingAndelFormValues,
    StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

type MånedfelterNavn = EndretUtbetalingAndelFeltnavn.FOM | EndretUtbetalingAndelFeltnavn.TOM;

interface MånedvelgerProps extends StandardFeltProps {
    name: MånedfelterNavn;
    label: string;
    tidligsteDato: Date;
    senesteDato: Date;
    valgfri?: boolean;
}

const Månedvelger = ({ name, label, erLesevisning, tidligsteDato, senesteDato, valgfri }: MånedvelgerProps) => {
    const { control } = useFormContext<EndretUtbetalingAndelFormValues>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: valgfri ? undefined : `${label} er påkrevd` }}
            render={({ field, fieldState, formState }) => {
                const { monthpickerProps, inputProps } = useMonthpicker({
                    defaultSelected: field.value,
                    onMonthChange: field.onChange,
                    fromDate: tidligsteDato,
                    toDate: senesteDato,
                });

                return (
                    <MonthPicker {...monthpickerProps} dropdownCaption>
                        <MonthPicker.Input
                            {...inputProps}
                            label={label}
                            ref={field.ref}
                            readOnly={erLesevisning || formState.isSubmitting}
                            error={formState.isSubmitted && fieldState.error?.message}
                        />
                    </MonthPicker>
                );
            }}
        />
    );
};

export default Månedvelger;
