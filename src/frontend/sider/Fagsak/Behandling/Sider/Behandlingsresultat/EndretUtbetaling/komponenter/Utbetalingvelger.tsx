import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Label, Radio, RadioGroup } from '@navikt/ds-react';

import { erUtbetalingTillattForÅrsakRHF, Utbetaling, utbetalingTilLabel } from '../../Utbetaling';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

const Utbetalingvelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control, watch } = useFormContext<EndretUtbetalingAndelFormValues>();

    const årsak = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK);

    return (
        <Controller
            name={EndretUtbetalingAndelFeltnavn.UTBETALING}
            control={control}
            rules={{ required: 'Du må velge om beløpet skal utbetales' }}
            render={({ field, fieldState: { error }, formState: { isSubmitting } }) => (
                <RadioGroup
                    legend={<Label>Utbetaling</Label>}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    readOnly={erLesevisning || isSubmitting}
                    error={error?.message}
                >
                    {Object.values(Utbetaling)
                        .filter(utbetaling => erUtbetalingTillattForÅrsakRHF(årsak, utbetaling))
                        .map(utbetaling => (
                            <Radio
                                name={'utbetaling'}
                                value={utbetaling}
                                id={utbetaling}
                                key={utbetaling}
                                ref={field.ref}
                            >
                                {utbetalingTilLabel(utbetaling)}
                            </Radio>
                        ))}
                </RadioGroup>
            )}
        />
    );
};

export default Utbetalingvelger;
