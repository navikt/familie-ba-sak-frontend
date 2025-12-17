import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

export const Begrunnelse = ({ erLesevisning }: StandardFeltProps) => {
    const { control } = useFormContext<EndretUtbetalingAndelFormValues>();

    return (
        <Controller
            name={EndretUtbetalingAndelFeltnavn.BEGRUNNELSE}
            control={control}
            rules={{ required: 'Du må begrunne den endrede utbetalingsperioden' }}
            render={({
                field: { value, onChange, onBlur, ref },
                fieldState: { error },
                formState: { isSubmitting },
            }) => (
                <Textarea
                    label={'Begrunnelse'}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    error={error?.message}
                    readOnly={erLesevisning || isSubmitting}
                />
            )}
        />
    );
};
