import { Textarea } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndel';

export const Begrunnelse = ({ erLesevisning }: StandardFeltProps) => {
    const { control } = useFormContext<EndretUtbetalingAndelFormValues>();

    const { field, fieldState, formState } = useController({
        name: EndretUtbetalingAndelFeltnavn.BEGRUNNELSE,
        control,
        rules: { required: 'Du må begrunne den endrede utbetalingsperioden' },
    });

    return (
        <Textarea
            label={'Begrunnelse'}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            error={fieldState.error?.message}
            readOnly={erLesevisning || formState.isSubmitting}
        />
    );
};
