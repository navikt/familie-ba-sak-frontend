import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { IEndretUtbetalingAndelÅrsak, årsaker, årsakTekst } from '../../../../../../../typer/utbetalingAndel';
import { Utbetaling } from '../../Utbetaling';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

const Årsakvelger = ({ erLesevisning }: StandardFeltProps) => {
    const { control, setValue } = useFormContext<EndretUtbetalingAndelFormValues>();

    return (
        <Controller
            name={EndretUtbetalingAndelFeltnavn.ÅRSAK}
            control={control}
            rules={{ required: 'Du må velge en årsak' }}
            render={({ field, fieldState: { error }, formState: { isSubmitting } }) => {
                const håndterEndring = (event: React.ChangeEvent<HTMLSelectElement>) => {
                    field.onChange(event);
                    if (
                        event.target.value === IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER ||
                        event.target.value === IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT
                    ) {
                        setValue(EndretUtbetalingAndelFeltnavn.UTBETALING, Utbetaling.INGEN_UTBETALING);
                    } else {
                        setValue(EndretUtbetalingAndelFeltnavn.UTBETALING, '');
                    }
                };

                return (
                    <Select
                        value={field.value || ''}
                        label={'Årsak'}
                        onChange={håndterEndring}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        readOnly={erLesevisning || isSubmitting}
                        error={error?.message}
                    >
                        <option value="">Velg årsak</option>
                        {årsaker.map(årsak => (
                            <option value={årsak.valueOf()} key={årsak.valueOf()}>
                                {årsakTekst[årsak]}
                            </option>
                        ))}
                    </Select>
                );
            }}
        />
    );
};

export default Årsakvelger;
