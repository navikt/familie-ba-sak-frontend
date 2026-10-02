import { Label, Radio, RadioGroup } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

import { erUtbetalingTillattForÅrsak, Utbetaling, utbetalingTilLabel } from '../../Utbetaling';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndel';

export const Utbetalingvelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control, watch } = useFormContext<EndretUtbetalingAndelFormValues>();

    const årsak = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK);

    const { field, fieldState, formState } = useController({
        name: EndretUtbetalingAndelFeltnavn.UTBETALING,
        control,
        rules: { required: 'Du må velge om beløpet skal utbetales' },
    });

    return (
        <RadioGroup
            legend={<Label>Utbetaling</Label>}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            readOnly={erLesevisning || formState.isSubmitting}
            error={fieldState.error?.message}
        >
            {Object.values(Utbetaling)
                .filter(utbetaling => erUtbetalingTillattForÅrsak(årsak, utbetaling))
                .map(utbetaling => (
                    <Radio name={'utbetaling'} value={utbetaling} id={utbetaling} key={utbetaling} ref={field.ref}>
                        {utbetalingTilLabel(utbetaling)}
                    </Radio>
                ))}
        </RadioGroup>
    );
};
