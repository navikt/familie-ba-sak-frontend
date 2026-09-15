import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import type { IsoDatoString } from '@utils/dato';
import { dateTilIsoDatoStringEllerUndefined, erIsoStringGyldig } from '@utils/dato';
import { isValid, parseISO } from 'date-fns';
import type { Path } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';

import type { BrevModulFormValues } from '../useBrevModul';
import { useSkjemaErLåst } from '../useSkjemaErLåst';

interface Props {
    name: Path<BrevModulFormValues>;
    avtaleDatoErPåkrevd: boolean;
    minDatoAvgrensning?: Date;
}

export function AvtaleDatoInput({ name, avtaleDatoErPåkrevd, minDatoAvgrensning }: Props) {
    const { clearErrors, control } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const { field, fieldState } = useController({
        control,
        name,
        rules: {
            validate: (verdi: unknown) => {
                const dato = verdi as IsoDatoString;
                if (!avtaleDatoErPåkrevd) {
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

    const valgtDato = typeof field.value === 'string' && field.value ? parseISO(field.value) : undefined;

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: valgtDato && isValid(valgtDato) ? valgtDato : undefined,
        onDateChange: dato => {
            field.onChange(dateTilIsoDatoStringEllerUndefined(dato) ?? '');
            clearErrors(name);
        },
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
                readOnly={skjemaErLåst}
            />
        </DatePicker>
    );
}
