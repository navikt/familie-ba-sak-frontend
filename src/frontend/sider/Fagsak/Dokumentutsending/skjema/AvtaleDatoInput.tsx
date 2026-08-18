import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import type { IsoDatoString } from '@utils/dato';
import { dateTilIsoDatoStringEllerUndefined, erIsoStringGyldig } from '@utils/dato';
import { isValid, parseISO } from 'date-fns';
import type { Path } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';

interface Props {
    name: Path<DokumentutsendingFormValues>;
    merket: boolean;
    minDatoAvgrensning?: Date;
}

export function AvtaleDatoInput({ name, merket, minDatoAvgrensning }: Props) {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        control,
        name,
        rules: {
            validate: (verdi: unknown) => {
                const dato = verdi as IsoDatoString;
                if (!merket) {
                    return undefined;
                } else if (dato === '') {
                    return 'Du må fylle inn dato for avtale';
                } else if (!erIsoStringGyldig(dato)) {
                    return 'Du må fylle inn en gyldig dato for avtale';
                } else {
                    return undefined;
                }
            },
        },
    });

    const defaultSelected = field.value ? parseISO(field.value) : undefined;

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: defaultSelected && isValid(defaultSelected) ? defaultSelected : undefined,
        onDateChange: dato => field.onChange(dateTilIsoDatoStringEllerUndefined(dato) ?? ''),
        fromDate: minDatoAvgrensning ?? tidligsteRelevanteDato,
        toDate: senesteRelevanteDato,
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Dato for avtale om delt bosted'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                error={fieldState.error?.message}
            />
        </DatePicker>
    );
}
