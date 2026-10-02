import { Select } from '@navikt/ds-react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { IEndretUtbetalingAndelÅrsak, årsaker, årsakTekst } from '../../../../../../../typer/utbetalingAndel';
import { Utbetaling } from '../../Utbetaling';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndel';

export const Årsakvelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control, setValue } = useFormContext<EndretUtbetalingAndelFormValues>();

    const { field, fieldState, formState } = useController({
        name: EndretUtbetalingAndelFeltnavn.ÅRSAK,
        control,
        rules: { required: 'Du må velge en årsak' },
    });

    const håndterEndring = (event: ChangeEvent<HTMLSelectElement>) => {
        field.onChange(event);
        if (
            event.target.value === IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER ||
            event.target.value === IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT
        ) {
            setValue(EndretUtbetalingAndelFeltnavn.UTBETALING, Utbetaling.INGEN_UTBETALING);
        } else {
            setValue(EndretUtbetalingAndelFeltnavn.UTBETALING, null);
        }
    };

    return (
        <Select
            value={field.value || ''}
            label={'Årsak'}
            onChange={håndterEndring}
            onBlur={field.onBlur}
            ref={field.ref}
            readOnly={erLesevisning || formState.isSubmitting}
            error={fieldState.error?.message}
        >
            <option value="">Velg årsak</option>
            {årsaker.map(årsak => (
                <option value={årsak.valueOf()} key={årsak.valueOf()}>
                    {årsakTekst[årsak]}
                </option>
            ))}
        </Select>
    );
};
