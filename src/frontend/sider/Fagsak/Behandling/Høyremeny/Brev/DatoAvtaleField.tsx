import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { isValid } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function DatoAvtaleField() {
    const { control } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.DATO_AVTALE,
        control,
        rules: {
            validate: value => (value && isValid(value) ? undefined : 'Du må velge en gyldig dato'),
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value,
        onDateChange: (dato?: Date) => onChange(dato),
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
