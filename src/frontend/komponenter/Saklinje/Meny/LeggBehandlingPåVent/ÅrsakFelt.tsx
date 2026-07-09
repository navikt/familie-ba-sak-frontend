import { settPåVentÅrsaker } from '@typer/behandling';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { hentVelgbareÅrsaker } from './settPåVentUtils';
import { SettPåVentFelt, type SettPåVentFormValues } from './useSettPåVentSkjema';

export function ÅrsakFelt() {
    const { control } = useFormContext<SettPåVentFormValues>();

    const årsaker = hentVelgbareÅrsaker();

    const { field, fieldState, formState } = useController({
        name: SettPåVentFelt.ÅRSAK,
        control,
        rules: {
            required: 'Du må velge en årsak',
        },
    });

    const { name, value, ref, onBlur, onChange } = field;
    const { error } = fieldState;
    const { isSubmitting } = formState;

    return (
        <Select
            label={'Årsak'}
            name={name}
            value={value}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            error={error?.message}
            readOnly={isSubmitting}
        >
            <option value={''}>Velg årsak</option>
            {årsaker.map(årsak => (
                <option value={årsak} key={årsak}>
                    {settPåVentÅrsaker[årsak]}
                </option>
            ))}
        </Select>
    );
}
