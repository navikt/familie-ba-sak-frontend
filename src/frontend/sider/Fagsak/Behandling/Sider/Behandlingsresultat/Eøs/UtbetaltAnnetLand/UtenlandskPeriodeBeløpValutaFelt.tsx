import { EØS_VALUTAKODER, type Valutakode, ValutaCombobox } from '@komponenter/FlaggCombobox';
import { isEmpty } from '@utils/eøsValidators';
import { useController, useFormContext } from 'react-hook-form';

import { UtenlandskPeriodeBeløpFelt, type UtenlandskPeriodeBeløpFormValues } from './useUtenlandskPeriodeBeløpSkjema';

interface Props {
    readOnly: boolean;
}

export function UtenlandskPeriodeBeløpValutaFelt({ readOnly }: Props) {
    const { control } = useFormContext<UtenlandskPeriodeBeløpFormValues>();

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: UtenlandskPeriodeBeløpFelt.VALUTAKODE,
        control,
        rules: {
            validate: valutakode => (!isEmpty(valutakode) ? undefined : 'Valuta er påkrevd, men mangler input'),
        },
    });

    return (
        <ValutaCombobox
            label={'Valuta'}
            value={value as Valutakode}
            options={EØS_VALUTAKODER}
            onChange={nyValutakode => onChange(nyValutakode ?? undefined)}
            ref={ref}
            readOnly={readOnly || isSubmitting}
            error={error?.message}
        />
    );
}
