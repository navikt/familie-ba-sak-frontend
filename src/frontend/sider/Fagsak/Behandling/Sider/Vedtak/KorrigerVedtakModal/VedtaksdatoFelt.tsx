import { useRef } from 'react';

import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import {
    KorrigerVedtakFelt,
    type KorrigerVedtakFormValues,
} from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtakModal/useKorrigerVedtakSkjema';
import { dateTilIsoDatoString, isoStringTilDate } from '@utils/dato';
import { format, startOfDay } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

interface Props {
    erLesevisning: boolean;
}

export function VedtaksdatoFelt({ erLesevisning }: Props) {
    const { control, trigger } = useFormContext<KorrigerVedtakFormValues>();

    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: KorrigerVedtakFelt.VEDTAKSDATO,
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
                    return 'Du må velge en gyldig dato.';
                }

                if (!value) {
                    return 'Du må velge en gyldig dato.';
                }

                return undefined;
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: dato => {
            onChange(dato ? dateTilIsoDatoString(startOfDay(dato)) : null);
            if (isSubmitted) {
                trigger(KorrigerVedtakFelt.VEDTAKSDATO);
            }
        },
        fromDate: tidligsteRelevanteDato,
        toDate: startOfDay(new Date()),
        required: true,
        defaultSelected: value ? isoStringTilDate(value) : undefined,
        onValidate: validation => {
            dateValidationRef.current = validation;
            trigger(KorrigerVedtakFelt.VEDTAKSDATO);
        },
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Vedtaksdato'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={isSubmitting || erLesevisning}
                error={error?.message}
            />
        </DatePicker>
    );
}
