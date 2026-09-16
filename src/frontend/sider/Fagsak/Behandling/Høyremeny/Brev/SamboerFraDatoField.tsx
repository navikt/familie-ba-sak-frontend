import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { isValid } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { SendManueltBrevFeltnavn, type SendManueltBrevFormValues } from './useSendManueltBrevForm';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function SamboerFraDatoField() {
    const { control } = useFormContext<SendManueltBrevFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: SendManueltBrevFeltnavn.DATO_AVTALE,
        control,
        rules: {
            validate: value => (value && isValid(value) ? undefined : 'Du må velge en gyldig dato'),
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value ?? undefined,
        onDateChange: (dato?: Date) => onChange(dato ?? null),
        fromDate: tidligsteRelevanteDato,
        toDate: senesteRelevanteDato,
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Samboer fra'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={skjemaErLåst}
                error={error?.message}
            />
        </DatePicker>
    );
}
