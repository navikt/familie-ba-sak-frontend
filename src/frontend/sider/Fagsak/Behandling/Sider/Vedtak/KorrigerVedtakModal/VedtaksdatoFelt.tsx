import {
    KorrigerVedtakFelt,
    type KorrigerVedtakFormValues,
} from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtakModal/useKorrigerVedtakSkjema';
import { validerGyldigDato } from '@utils/dato';
import { startOfDay } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

interface Props {
    erLesevisning: boolean;
}

export function VedtaksdatoFelt({ erLesevisning }: Props) {
    const { control } = useFormContext<KorrigerVedtakFormValues>();

    const {
        field,
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: KorrigerVedtakFelt.VEDTAKSDATO,
        control,
        rules: { required: 'Du må velge en gyldig dato.', validate: validerGyldigDato },
    }); // TODO: validering

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: field.onChange,
        toDate: startOfDay(new Date()),
        required: true,
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Vedtaksdato'}
                readOnly={isSubmitting || erLesevisning}
                error={error?.message}
            />
        </DatePicker>
    );
}
