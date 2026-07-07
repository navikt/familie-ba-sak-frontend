import { useRef } from 'react';

import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { dagensDato, dateTilIsoDatoString, isoStringTilDate } from '@utils/dato';
import { format, startOfDay } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

export function KlageMottattDatoFelt() {
    const { control, trigger } = useFormContext<OpprettBehandlingFormValues>();
    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { onChange, value },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: OpprettBehandlingFelt.KLAGE_MOTTATT_DATO,
        control,
        rules: {
            validate: value => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation && dateValidation.isAfter) {
                    return 'Du kan ikke sette en dato som er frem i tid.';
                }

                if (dateValidation && dateValidation.isBefore) {
                    return `Du kan ikke sette en dato som er etter ${format(tidligsteRelevanteDato, 'dd.MM.yyyy')}.`;
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
                trigger(OpprettBehandlingFelt.KLAGE_MOTTATT_DATO);
            }
        },
        fromDate: tidligsteRelevanteDato,
        toDate: dagensDato,
        required: true,
        onValidate: validation => {
            dateValidationRef.current = validation;
            trigger(OpprettBehandlingFelt.KLAGE_MOTTATT_DATO);
        },
        defaultSelected: value ? isoStringTilDate(value) : undefined,
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Klage mottatt dato'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                error={error?.message}
                readOnly={isSubmitting}
            />
        </DatePicker>
    );
}
