import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';
import { dateTilIsoDatoString, isoStringTilDate } from '@utils/dato';
import { format, startOfDay } from 'date-fns';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

const MAKSDATO_FOR_MIGRERING = new Date('2023-01-01');

export function MigreringsdatoFelt() {
    const { control, trigger } = useFormContext<OpprettBehandlingFormValues>();
    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { onChange, value },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: OpprettBehandlingFelt.MIGRERINGSDATO,
        control,
        rules: {
            validate: value => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation && dateValidation.isAfter) {
                    return `Du kan ikke sette en dato som er etter ${format(MAKSDATO_FOR_MIGRERING, 'dd.MM.yyyy')}.`;
                }

                if (dateValidation && dateValidation.isBefore) {
                    return `Du må velge en dato som er etter ${format(tidligsteRelevanteDato, 'dd.MM.yyyy')}.`;
                }

                if (dateValidation && (dateValidation.isInvalid || !dateValidation.isValidDate)) {
                    return 'Du må velge en gyldig dato';
                }

                if (!value) {
                    return 'Du må velge en gyldig dato';
                }

                return undefined;
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: dato => {
            onChange(dato ? dateTilIsoDatoString(startOfDay(dato)) : '');
            if (isSubmitted) {
                trigger(OpprettBehandlingFelt.MIGRERINGSDATO);
            }
        },
        fromDate: tidligsteRelevanteDato,
        toDate: MAKSDATO_FOR_MIGRERING,
        required: true,
        onValidate: validation => {
            dateValidationRef.current = validation;
            trigger(OpprettBehandlingFelt.MIGRERINGSDATO);
        },
        defaultSelected: value ? isoStringTilDate(value) : undefined,
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Ny migreringsdato'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                error={error?.message}
                readOnly={isSubmitting}
            />
        </DatePicker>
    );
}
