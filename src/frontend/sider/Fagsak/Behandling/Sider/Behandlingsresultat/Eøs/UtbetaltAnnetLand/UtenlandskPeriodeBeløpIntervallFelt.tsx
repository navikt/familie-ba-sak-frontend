import { UtenlandskPeriodeBeløpIntervall, utenlandskPeriodeBeløpIntervaller } from '@typer/eøsPerioder';
import { isEmpty } from '@utils/eøsValidators';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { UtenlandskPeriodeBeløpFelt, type UtenlandskPeriodeBeløpFormValues } from './useUtenlandskPeriodeBeløpSkjema';

interface Props {
    readOnly: boolean;
}

export function UtenlandskPeriodeBeløpIntervallFelt({ readOnly }: Props) {
    const { control } = useFormContext<UtenlandskPeriodeBeløpFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: UtenlandskPeriodeBeløpFelt.INTERVALL,
        control,
        rules: {
            validate: intervall => (!isEmpty(intervall) ? undefined : 'Intervall er påkrevd, men mangler input'),
        },
    });

    return (
        <Select
            label={'Intervall'}
            readOnly={readOnly || isSubmitting}
            value={value || ''}
            onChange={event => onChange((event.target.value as UtenlandskPeriodeBeløpIntervall) || undefined)}
            onBlur={onBlur}
            ref={ref}
            error={error?.message}
            size={'medium'}
        >
            <option key={'-'} value={''}>
                Velg
            </option>
            {Object.values(UtenlandskPeriodeBeløpIntervall).map(intervall => (
                <option key={intervall} value={intervall}>
                    {utenlandskPeriodeBeløpIntervaller[intervall]}
                </option>
            ))}
        </Select>
    );
}
