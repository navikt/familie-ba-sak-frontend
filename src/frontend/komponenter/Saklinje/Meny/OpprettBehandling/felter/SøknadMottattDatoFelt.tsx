import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { Box, DatePicker, type DateValidationT, LocalAlert, useDatepicker } from '@navikt/ds-react';
import { dagensDato, dateTilIsoDatoString, isoStringTilDate } from '@utils/dato';
import { format, isBefore, startOfDay, subDays } from 'date-fns';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

export function SøknadMottattDatoFelt() {
    const { control, trigger } = useFormContext<OpprettBehandlingFormValues>();
    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { onChange, value },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO,
        control,
        rules: {
            validate: value => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation && dateValidation.isAfter) {
                    return 'Du kan ikke sette en dato som er frem i tid.';
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

    const søknadMottattDatoErMerEnn360DagerSiden =
        !!value && isBefore(isoStringTilDate(value), subDays(dagensDato, 360));

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: dato => {
            onChange(dato ? dateTilIsoDatoString(startOfDay(dato)) : '');
            if (isSubmitted) {
                trigger(OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO);
            }
        },
        fromDate: tidligsteRelevanteDato,
        toDate: dagensDato,
        required: true,
        onValidate: validation => {
            dateValidationRef.current = validation;
            trigger(OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO);
        },
        defaultSelected: value ? isoStringTilDate(value) : undefined,
    });

    return (
        <>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    label={'Søknad mottatt dato'}
                    placeholder={'DD.MM.ÅÅÅÅ'}
                    error={error?.message}
                    readOnly={isSubmitting}
                />
            </DatePicker>
            {søknadMottattDatoErMerEnn360DagerSiden && (
                <Box marginBlock={'space-24 space-0'}>
                    <LocalAlert status={'warning'}>
                        <LocalAlert.Header>
                            <LocalAlert.Title>Er mottatt dato riktig?</LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>Det er mer enn 360 dager siden denne datoen.</LocalAlert.Content>
                    </LocalAlert>
                </Box>
            )}
        </>
    );
}
