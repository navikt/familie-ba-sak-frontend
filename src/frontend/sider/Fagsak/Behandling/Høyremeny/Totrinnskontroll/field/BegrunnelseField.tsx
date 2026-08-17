import {
    TotrinnskontrollFormField,
    type TotrinnskontrollFormValues,
} from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/useTotrinnskontrollForm';
import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

export function BegrunnelseField() {
    const { control } = useFormContext<TotrinnskontrollFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: TotrinnskontrollFormField.BEGRUNNELSE,
        control,
        rules: {
            maxLength: { value: 2000, message: 'Maks 2000 tegn.' },
            required: 'Du må fylle ut en begrunnelse.',
        },
    });

    return (
        <Textarea
            id={name}
            name={name}
            label={'Begrunnelse'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            maxLength={2000}
            error={error?.message}
            readOnly={isSubmitting}
        />
    );
}
